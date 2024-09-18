document.addEventListener("DOMContentLoaded", function () {
    // Function to get the query parameter 'id' from the URL
    function getProductIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    // Function to fetch product data by ID
    async function fetchProductById(productId) {
        const apiEndpoint = `https://diamondstone.kz/api-getProduct/${productId}`;
        try {
            const response = await fetch(apiEndpoint);
            const data = await response.json();
            if (data.success) {
                console.log("product", data.product[0]);
                return data.product[0]; // Assuming product is an object, not an array
            } else {
                console.error("Failed to fetch product data");
                return null;
            }
        } catch (error) {
            console.error("Error fetching product data:", error);
            return null;
        }
    }

    function updateProductDetails(product) {
        if (!product) return;

        const smallImage1 = document.getElementById("small-image-1");
        smallImage1.src = `https://diamondstone.kz/api-productImage/${product.photo1}`

        const smallImage2 = document.getElementById("small-image-2");
        smallImage2.src = `https://diamondstone.kz/api-productImage/${product.photo2}`

        const smallImage3 = document.getElementById("small-image-3");
        smallImage3.src = `https://diamondstone.kz/api-productImage/${product.photo3}`

        const bigImage1 = document.getElementById("big-image-1");
        bigImage1.src = `https://diamondstone.kz/api-productImage/${product.photo1}`

        const bigImage2 = document.getElementById("big-image-2");
        bigImage2.src = `https://diamondstone.kz/api-productImage/${product.photo2}`

        const bigImage3 = document.getElementById("big-image-3");
        bigImage3.src = `https://diamondstone.kz/api-productImage/${product.photo3}`

        const addCartButton = document.getElementById("add-cart-button");
        addCartButton.dataset.name = product.title;
        addCartButton.dataset.image = `$https://diamondstone.kz/api-productImage/${product.image}`;
        addCartButton.dataset.collection = product.category;
        addCartButton.dataset.color = product.color;
        addCartButton.dataset.material = product.material;
        addCartButton.dataset.size = product.size;
        addCartButton.dataset.thickness = product.thickness;
        addCartButton.weight = product.weight;
        console.log("addCartButton: ", addCartButton);

        // Update text details (title, category, etc.)
        const title = document.querySelector(".single_product__title");
        title.innerText = product.title;

        const mainTitle = document.getElementById('main-title');
        mainTitle.innerText = product.title;

        const code = document.getElementById("product_code")
        code.innerText = product.title

        const category = document.getElementById("product_category")
        category.innerText = product.category

        const mainCategory = document.getElementById('main-category');
        mainCategory.innerText = product.category;

        const color = document.getElementById("product_color");
        color.innerText = product.color;

        const material = document.getElementById("product_material");
        material.innerText = product.material;

        const size = document.getElementById("product_size");
        size.innerText = product.size;

        const thickness = document.getElementById("product_thickness");
        thickness.innerText = product.thickness;

        const placeOfApplication = document.getElementById("product_place_of_application");
        placeOfApplication.innerText = product.placeOfApplication;

        const descriptionTitle = document.getElementById("description-title");
        console.log("descriptionTitle: ", descriptionTitle);
        descriptionTitle.innerText = product.descriptionTitle

        const description = document.getElementById("description");
        description.innerText = product.description
    }

    // Main function to execute the script logic
    async function main() {
        const productId = getProductIdFromUrl();
        if (!productId) {
            console.error("Product ID not found in URL");
            return;
        }

        const product = await fetchProductById(productId);
        updateProductDetails(product);
    }

    // Execute the main function
    main();
});
