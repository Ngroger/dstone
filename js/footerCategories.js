document.addEventListener("DOMContentLoaded", function() {
    const apiEndpoint = "https://diamondstone.kz/api-getAllCategories";
    const categoriesContainer = document.querySelector(".footer_item__categories_links ul");

    // Function to create a category link
    function createCategoryLink(category) {
        return `
            <li>
                <a class="footer_after_link" style="color: #000;" href="collection.html?id=${category.category_id}">${category.title}</a>
            </li>
        `;
    }

    // Fetch data from API
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.categories && data.categories.length > 0) {
                categoriesContainer.innerHTML = '';

                data.categories.forEach(category => {
                    const categoryLinkHTML = createCategoryLink(category);
                    categoriesContainer.insertAdjacentHTML('beforeend', categoryLinkHTML);
                });
            } else {
                console.error("No categories found or API request failed");
            }
        })
        .catch(error => console.error("Error fetching categories:", error));
});
