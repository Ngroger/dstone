// Функция для обновления текста кнопки "Корзина"
function updateCartButton() {
  // Получаем корзину из локального хранилища и парсим ее или создаем пустую корзину
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Получаем количество товаров в корзине
  const cartLength = cart.length;

  // Находим кнопку "Корзина" по id
  const cartButton = document.getElementById('openscarts');

  // Проверяем, что кнопка существует на странице
  if (cartButton) {
    // Обновляем текст кнопки в зависимости от количества товаров
    cartButton.textContent = cartLength > 0 ? `${cartLength} Корзина` : 'Корзина';
  }
}

// Запуск функции обновления каждую секунду
setInterval(updateCartButton, 1000);

// Также запускаем функцию один раз при загрузке страницы
document.addEventListener('DOMContentLoaded', updateCartButton);
