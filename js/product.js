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
                return data.product[0];
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
        const swiperWrapperThumbs = document.querySelector(".gallery_thumbs");
        const noImagesMessage = document.getElementById("no-images-message");

        // Filter out null images and move them to the end
        const images = [product.photo1, product.photo2, product.photo3]
            .filter(photo => photo) // Remove null/undefined entries
            .concat([product.photo1, product.photo2, product.photo3].filter(photo => !photo)); // Append null/undefined entries

        let photoCount = 0;

        const fields = [
            { id: "product_code_container", value: product.title },
            { id: "product_category_container", value: product.category },
            { id: "product_color_container", value: product.color },
            { id: "product_material_container", value: product.material },
            { id: "product_size_container", value: product.size },
            { id: "product_thickness_container", value: product.thickness },
            { id: "product_place_of_application_container", value: product.placeOfApplication },
        ];

        fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (field.value) {
                element.querySelector("span").innerText = field.value;
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });

        images.forEach((photo, index) => {
            if (photo) {
                console.log(`Image ${index + 1} URL: https://diamondstone.kz/api-productImage/${photo}`);

                const bigSlideDiv = document.createElement('div');
                bigSlideDiv.classList.add('swiper-slide');

                const bigImage = document.createElement('img');
                bigImage.style.objectFit = 'cover';
                bigImage.style.width = '100%';
                bigImage.src = `https://diamondstone.kz/api-productImage/${photo}`;
                bigImage.alt = product.title;

                bigSlideDiv.appendChild(bigImage);
                swiperWrapperBig.appendChild(bigSlideDiv);

                const smallSlideDiv = document.createElement('div');
                smallSlideDiv.classList.add('swiper-slide');

                const smallImage = document.createElement('img');
                smallImage.style.height = '100px';
                smallImage.src = `https://diamondstone.kz/api-productImage/${photo}`;
                smallImage.alt = product.title;

                smallSlideDiv.appendChild(smallImage);
                swiperWrapperThumbs.querySelector(".swiper-wrapper").appendChild(smallSlideDiv);

                photoCount++;
            }
        });

        // Hide gallery thumbs if there’s only one valid image
        if (photoCount < 2) {
            swiperWrapperThumbs.style.display = 'none';
        }

        const prevButton = document.getElementById("prev_template-product");
        const nextButton = document.getElementById("next_template-product");

        if (photoCount < 2) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }

        if (photoCount === 0) {
            noImagesMessage.style.display = 'block'; // Показываем заглушку
        } else {
            noImagesMessage.style.display = 'none'; // Скрываем заглушку
        };

        // Update addCartButton data attributes
        const addCartButton = document.getElementById("add-cart-button");
        addCartButton.dataset.name = product.title;
        addCartButton.dataset.image = `https://diamondstone.kz/api-productImage/${product.photo1 || 'no-image.png'}`;
        addCartButton.dataset.collection = product.category;
        addCartButton.dataset.color = product.color;
        addCartButton.dataset.material = product.material;
        addCartButton.dataset.size = product.size;
        addCartButton.dataset.thickness = product.thickness;
        addCartButton.weight = product.weight;
        addCartButton.dataset.id = product.product_id

        // Update text details (title, category, etc.)
        document.querySelector(".single_product__title").innerText = product.title;
        document.getElementById('main-title').innerText = product.title;
        document.getElementById("product_code").innerText = product.title;
        document.getElementById("product_category").innerText = product.category;
        document.getElementById('main-category').innerText = product.category;
        document.getElementById("product_color").innerText = product.color;
        document.getElementById("product_material").innerText = product.material;
        document.getElementById("product_size").innerText = product.size;
        document.getElementById("product_thickness").innerText = product.thickness;
        document.getElementById("product_place_of_application").innerText = product.placeOfApplication;
        document.getElementById("description-title").innerText = product.descriptionTitle;
        document.getElementById("description").innerText = product.description;
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
