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

        // Меняем заголовок страницы
        document.title = product.title;

        const images = [product.photo1, product.photo2, product.photo3].filter(Boolean); // Фильтруем null или undefined

        const mainSlide = document.getElementById("custom-main-slide");
        const thumbsContainer = document.getElementById("custom-thumbs-container");
        const prevButton = document.getElementById("custom-prev-slide");
        const nextButton = document.getElementById("custom-next-slide");
        const thumbsWrapper = document.querySelector(".custom-slider-thumbs");

        // Удаляем старые миниатюры, если они были
        thumbsContainer.innerHTML = "";

        // Если только одна фотография, скрываем стрелки и превью
        if (images.length <= 1) {
            prevButton.style.display = "none";
            nextButton.style.display = "none";
            thumbsWrapper.style.display = "none";

            if (images.length === 1) {
                mainSlide.src = `https://diamondstone.kz/api-productImage/${images[0]}`;
            }
        } else {
            let currentIndex = 0;

            // Добавляем миниатюры
            images.forEach((image, index) => {
                const thumb = document.createElement("img");
                thumb.classList.add("custom-thumb");
                thumb.dataset.index = index;
                thumb.src = `https://diamondstone.kz/api-productImage/${image}`;
                thumb.alt = `Thumb ${index + 1}`;
                thumbsContainer.appendChild(thumb);
            });

            const thumbs = document.querySelectorAll(".custom-thumb");

            function updateMainSlide(index) {
                mainSlide.src = `https://diamondstone.kz/api-productImage/${images[index]}`;
                thumbs.forEach((thumb, i) => {
                    thumb.classList.toggle("active", i === index);
                });
            }

            // Навигация по стрелкам
            prevButton.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateMainSlide(currentIndex);
            });

            nextButton.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % images.length;
                updateMainSlide(currentIndex);
            });

            // Клик на миниатюры
            thumbs.forEach((thumb) => {
                thumb.addEventListener("click", () => {
                    currentIndex = parseInt(thumb.dataset.index, 10);
                    updateMainSlide(currentIndex);
                });
            });

            // Инициализация
            updateMainSlide(currentIndex);
        }

        // Заполняем остальные данные
        const fields = [
            { id: "product_code_container", label: "Код", value: product.title },
            { id: "product_category_container", label: "Коллекция", value: product.category },
            { id: "product_color_container", label: "Цвет", value: product.color },
            { id: "product_material_container", label: "Материал", value: product.material },
            { id: "product_size_container", label: "Размер", value: product.size },
            { id: "product_thickness_container", label: "Толщина", value: product.thickness },
            { id: "product_place_of_application_container", label: "Место применения", value: product.placeOfApplication },
        ];

        fields.forEach(field => {
            const element = document.getElementById(field.id);

            // Проверяем, если значение пустое, равно "-" или null/undefined
            if (field.value && field.value !== "-") {
                element.querySelector("span").innerText = field.value;
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });

        // Update addCartButton data attributes
        const addCartButton = document.getElementById("add-cart-button");
        addCartButton.dataset.name = product.title;
        addCartButton.dataset.image = `https://diamondstone.kz/api-productImage/${product.photo1 || 'no-image.png'}`;
        addCartButton.dataset.collection = product.category;
        addCartButton.dataset.color = product.color;
        addCartButton.dataset.material = product.material;
        addCartButton.dataset.size = product.size;
        addCartButton.dataset.thickness = product.thickness;
        addCartButton.dataset.id = product.product_id;

        // Update text details (title, category, etc.)
        document.querySelector(".single_product__title").innerText = product.title;
        document.getElementById("description-title").innerText = product.descriptionTitle !== "-" ? product.descriptionTitle : "";
        document.getElementById("description").innerText = product.description !== "-" ? product.description : "";
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
