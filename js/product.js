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

        const swiperWrapperBig = document.querySelector(".gallery_big .swiper-wrapper");
        const swiperWrapperThumbs = document.querySelector(".gallery_thumbs .swiper-wrapper");
        const noImagesMessage = document.getElementById("no-images-message");
        
        const images = [{ photo: product.photo1 },{ photo: product.photo2 },{ photo: product.photo3 }];

        let photoCount = 0;

        images.forEach((image, index) => {
            if (image.photo && image.photo !== 'no-image.png') {
                const slideIndex = index + 1;

                const bigSlideDiv = document.createElement('div');
                bigSlideDiv.classList.add('swiper-slide');
                bigSlideDiv.id = `big-slide-${slideIndex}`;

                const bigImage = document.createElement('img');
                bigImage.id = `big-image-${slideIndex}`;
                bigImage.style.objectFit = 'cover';
                bigImage.style.width = '100%';
                bigImage.src = `https://diamondstone.kz/api-productImage/${image.photo}`;
                bigImage.alt = product.title;

                bigSlideDiv.appendChild(bigImage);
                swiperWrapperBig.appendChild(bigSlideDiv);

                const smallSlideDiv = document.createElement('div');
                smallSlideDiv.classList.add('swiper-slide');
                smallSlideDiv.id = `small-slide-${slideIndex}`;

                const smallImage = document.createElement('img');
                smallImage.id = `small-image-${slideIndex}`;
                smallImage.style.height = '100px';
                smallImage.src = `https://diamondstone.kz/api-productImage/${image.photo}`;
                smallImage.alt = product.title;

                smallSlideDiv.appendChild(smallImage);
                swiperWrapperThumbs.appendChild(smallSlideDiv);

                photoCount++;
            }
        });

        const prevButton = document.getElementById("prev_template-product");
        const nextButton = document.getElementById("next_template-product");

        if (photoCount < 2) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }

        if (photoCount === 0) {
            noImagesMessage.innerText = "У данного товара нет картинок";
            noImagesMessage.style.display = 'block';  
        } else {
            noImagesMessage.style.display = 'none';  
        }


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
