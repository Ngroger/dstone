document.addEventListener("DOMContentLoaded", function() {
    const apiEndpoint = "https://diamondstone.kz/api-getAllCategories";
    const container = document.querySelector(".collection_listing__main");

    // Function to fetch categories from the API
    async function fetchCategories() {
        try {
            const response = await fetch(apiEndpoint);
            const data = await response.json();
            if (data.success) {
                renderCategories(data.categories);
            } else {
                console.error("Failed to fetch categories");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    // Function to render categories
    function renderCategories(categories) {
        container.innerHTML = ""; // Clear any existing content

        categories.forEach((category, index) => {
            const categoryElement = document.createElement("div");
            if (index === 0) {
                categoryElement.classList.add("col-xs-3", "item_4_1", "item_2_1");
            } else {
                categoryElement.classList.add("col-xs-3");
            }

            const collectionItem = `
                <div class="collection_item flexible_block flexible_block__normal flexible_block__hover flexible_block__">
                    <a href="collections/collection.html?id=${category.category_id}">
                        <div class="layer_1 collection_img">
                            <div class="img_placeholder__wrap img_placeholder__medium" style="background-image: url(https://diamondstone.kz/api-categoryImage/${category.photo});"></div>
                        </div>
                        <div class="layer_2">
                            <div>
                                <span class="collection_title">${category.title}</span>
                                <span class="collection_products">${category.product_count} товаров</span>
                            </div>
                        </div>
                    </a>
                </div>
            `;

            categoryElement.innerHTML = collectionItem;
            container.appendChild(categoryElement);
        });
    }

    // Fetch and render categories on page load
    fetchCategories();
});
