// Функция для загрузки корзины из локального хранилища
function loadCart() {
  // Получаем корзину из локального хранилища или создаем пустую корзину
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  console.log("loadCart: ", cart);

  // Если корзина пуста, отображаем сообщение и выходим из функции
  if (cart.length === 0) {
    document.querySelector('tbody').innerHTML = '<tr><td colspan="4">Корзина пуста</td></tr>';
    return;
  }

  // Получаем элемент tbody, куда будем добавлять товары
  const cartTableBody = document.querySelector('tbody');
  cartTableBody.innerHTML = ''; // Очищаем таблицу перед рендерингом

  // Рендерим каждый товар из корзины
  cart.forEach(product => {
    console.log('Rendering product:', product);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="column_product_img">
            <a href="product.html?id=${product.id}">
                <img class="cart__image" src="${product.image}" alt="${product.name}" />
            </a>
        </td>
        <td class="column_product_info">
            <p class="cart_item__name product_name">
                <a href="/products/${product.name.replace(/ /g, '_')}">${product.name}</a>
            </p>
            <div class="cart_item__details">
                <p class="item_type"><b>Категория:</b> ${product.collection}</p>
                <p class="item_vendor"><b>Цвет:</b> ${product.color}</p>
                <p class="item_weight"><b>Размер:</b> ${product.size}</p>
            </div>
            <a class="btn cart_item__remove" data-id="${product.id}">Удалить</a>
        </td>
        <td class="column_price"></td>
        <td class="column_quantity">
            <div class="quantity_box">
                <input class="quantity_input" type="text" value="${product.quantity}" />
                <span class="quantity_down"><i class="fa fa-minus" aria-hidden="true"></i></span>
                <span class="quantity_up"><i class="fa fa-plus" aria-hidden="true"></i></span>
            </div>
        </td>
    `;
    cartTableBody.appendChild(row);
  });

  // Добавляем обработчик клика на кнопки "Удалить"
  document.querySelectorAll('.cart_item__remove').forEach(button => {
    button.addEventListener('click', handleRemoveItem);
  });
}

// Функция для удаления товара из корзины
function handleRemoveItem(event) {
  const productId = event.target.getAttribute('data-id');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Фильтруем корзину, удаляя товар с нужным id
  cart = cart.filter(product => product.id !== productId);

  // Сохраняем обновленную корзину в локальное хранилище
  localStorage.setItem('cart', JSON.stringify(cart));

  // Перезагружаем корзину
  loadCart();
}

// Запуск функции загрузки корзины после загрузки страницы
document.addEventListener('DOMContentLoaded', loadCart);
