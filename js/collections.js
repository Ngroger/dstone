document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const endpoint = `https://diamondstone.kz/api-getProductByCategory/${id}`;

    // Function to create a product card
    function createProductCard(product, isFirst) {
        const colClass = isFirst ? "col-sm-3 item_4_1 item_2_1" : "col-sm-3";

        return `
            <div class="${colClass}">
                <div class="product_item">
                    <div class="product_img">
                        <a class="img_change" href="../product.html?id=${product.product_id}">
                            <img loading="eager" style="height: 250px !important; width: 300px !important;" src="https://diamondstone.kz/api-productImage/${product.photo1}" alt="${product.title}" />
                        </a>
                    </div>
                    <div class="product_info">
                        <p class="product_name">
                            <a href="../product2.html">${product.title}</a>
                        </p>
                        <p class="product_desc product_desc__short">
                            ${product.descriptionTitle}
                        </p>
                        <p class="product_desc product_desc__long">
                            ${product.description}
                        </p>
                        <div class="product_links">
                            <button class="cart-add add-cart-button btn btn_big btn-cart" id="add-cart-button"
                                data-id="${product.product_id}"
                                data-name="${product.title}"
                                data-image="https://diamondstone.kz/api-productImage/${product.photo1}"
                                data-collection="${product.category}"
                                data-color="${product.color}"
                                data-material="${product.material}"
                                data-size="${product.size}"
                                data-thickness="${product.thickness}">
                                В корзину
                            </button>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        `;
    }

    // Fetch data from API
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.products && data.products.length > 0) {
                const productContainer = document.getElementById('product_listing__sorted');
                productContainer.innerHTML = '';

                data.products.forEach((product, index) => {
                    const productCardHTML = createProductCard(product, index === 0);
                    productContainer.insertAdjacentHTML('beforeend', productCardHTML);
                    const categoryTitle = document.getElementById("category-title");
                    categoryTitle.innerText = product.category;

                    const categoryPageTitle = document.getElementById("category-page-title");
                    categoryPageTitle.innerText = product.category;

                    const categoryBreadcrumbsTitle = document.getElementById("category-breadcrumbs-title");
                    categoryBreadcrumbsTitle.innerText = product.category;
                });
            } else {
                console.error("No products found or API request failed");
            }
        })
        .catch(error => console.error("Error fetching products:", error));
});
