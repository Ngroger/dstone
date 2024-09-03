// Инициализация корзины из локального хранилища
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция для обновления корзины в локальном хранилище
function updateLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция для добавления товара в корзину
function addToCart(product) {
  // Проверка на наличие товара в корзине
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    // Увеличиваем количество, если товар уже есть в корзине
    existingProduct.quantity += 1;
  } else {
    // Добавляем новый товар в корзину
    cart.push({ ...product, quantity: 1 });
  }

  // Обновляем корзину в локальном хранилище
  updateLocalStorage();
  alert(`${product.name} добавлен в корзину.`);
}

// Функция для извлечения данных из кнопки
function getProductData(button) {
  return {
    id: button.dataset.id,
    name: button.dataset.name,
    image: button.dataset.image,
    collection: button.dataset.collection,
    color: button.dataset.color,
    material: button.dataset.material,
    size: button.dataset.size,
    thickness: button.dataset.thickness
  };
}

// Обработчик кликов по кнопкам добавления в корзину
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-cart-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const product = getProductData(event.currentTarget);
      addToCart(product);
    });
  });
});
