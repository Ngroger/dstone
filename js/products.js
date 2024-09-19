document.addEventListener("DOMContentLoaded", function () {
    const apiEndpoint = "https://diamondstone.kz/api-getAllProducts";
    const container = document.querySelector(".product_listing__main"); // Убедитесь, что у вас есть этот контейнер в вашем HTML

    // Function to fetch products from the API
    async function fetchProducts() {
        try {
            const response = await fetch(apiEndpoint);
            const data = await response.json();
            if (data.success) {
                console.log("data.products", data.products);
                renderProducts(data.products);
            } else {
                console.error("Failed to fetch products");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    // Function to render products
    function renderProducts(products) {
        container.innerHTML = ""; // Clear any existing content

        // Shuffle the array of products
        const shuffledProducts = products.sort(() => 0.5 - Math.random());

        // Select the first 8 products from the shuffled array
        const randomProducts = shuffledProducts.slice(0, 8);

        randomProducts.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("col-xs-3");

            const productHTML = `
                <div class="product_item ">
                    <div class="product_img">
                        <a class="img_change" href="product.html?id=${product.product_id}">
                            <img loading="eager" style="product_container_image" src="https://diamondstone.kz/api-productImage/${product.photo1}" alt="${product.title}" />
                        </a>
                    </div>
                    <div class="product_info">
                        <p class="product_name">
                            <a href="product.html?id=${product.product_id}">${product.title}</a>
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
            `;

            productElement.innerHTML = productHTML;
            container.appendChild(productElement);
        });
    }

    // Fetch and render products on page load
    fetchProducts();
});
