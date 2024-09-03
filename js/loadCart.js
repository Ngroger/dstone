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
    const row = document.createElement('tr');
    row.innerHTML = `
          <td class="column_product_img">
              <a href="product.html?id=${product.id}">
                  <img class="cart__image" src="${product.image}" alt="${product.name}" />
              </a>
          </td>
          <td class="column_price">
              <span class="money">${product.price || 'Цена не указана'}</span>
          </td>
          <td class="column_quantity">
              <div class="quantity_box">
                  <input class="quantity_input" type="text" value="${product.quantity}" />
                  <span class="quantity_down"><i class="fa fa-minus" aria-hidden="true"></i></span>
                  <span class="quantity_up"><i class="fa fa-plus" aria-hidden="true"></i></span>
              </div>
          </td>
          <td class="column_total">
              <span class="money">${(product.price || 0) * product.quantity} тг</span>
          </td>
      `;

    // Добавляем строку товара в таблицу
    cartTableBody.appendChild(row);
  });
}

// Запуск функции загрузки корзины после загрузки страницы
document.addEventListener('DOMContentLoaded', loadCart);
