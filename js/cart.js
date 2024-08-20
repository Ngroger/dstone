/* eslint-disable no-var,prefer-arrow-callback,vars-on-top */
var es6 = document.createElement('script');
es6.src = 'js/cart.es6.js';
es6.type = 'module';

var es5 = document.createElement('script');
es5.src = 'js/cart.es5.js';
es5.setAttribute('nomodule', true);

var polyfill = document.createElement('script');
polyfill.src = 'https://unpkg.com/@webcomponents/webcomponentsjs@2.1.2/webcomponents-loader.js';

polyfill.onload = function () {
  window.WebComponents.waitFor(function () {
    document.head.appendChild(es6);
    document.head.appendChild(es5);
  });
};

document.head.appendChild(polyfill);

// Функция для добавления товара в корзину
function addToCart(event) {
  console.log("test");
  const button = event.target;
  const id = button.getAttribute('data-id');
  const name = button.getAttribute('data-name');
  const price = button.getAttribute('data-price');
  const image = button.getAttribute('data-image');
  const collection = button.getAttribute('data-collection');
  const color = button.getAttribute('data-color');
  const material = button.getAttribute('data-material');
  const size = button.getAttribute('data-size');
  const thickness = button.getAttribute('data-thickness');
  const weight = button.getAttribute('data-weight');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  console.log(id, name, price, image, collection, color, material, size, thickness, weight);

  const existingProductIndex = cart.findIndex(product => product.id === id);

  if (existingProductIndex >= 0) {
    alert(`Товар ${name} уже есть в корзине.`);
  } else {
    alert(`Товар ${name} добавлен в корзину`);
    cart.push({ id, name, image, collection, color, material, size, thickness, weight, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Добавление обработчиков событий на кнопки добавления в корзину
document.querySelectorAll('.cart-add').forEach(button => {
  button.addEventListener('click', addToCart);
});


document.querySelectorAll('.cart-add').forEach(button => {
  button.addEventListener('click', addToCart);
});

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  console.log("cart", cart);
  updateCartCount();

  const cartTable = document.querySelector('tbody');
  const cartTotalWeightElement = document.querySelector('.cart_total span');
  const cartTotalPriceElement = document.querySelector('.cart_total .money');

  let totalWeight = 0;
  let totalPrice = 0;

  cartTable.innerHTML = ''; // Очищаем текущие записи

  cart.forEach(product => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <tbody>
        <tr>
          <td class="column_product_img">
            <a href="product${product.id}.html">
              <img class="cart__image" src="${product.image}" alt="${product.name}" />
            </a>
          </td>

          <td class="column_product_info">
            <div class="cart_item__details">
              <p class="item_type">
                <b>Код:</b> ${product.name}
              </p>
              <p class="item_vendor"><b>Коллекция:</b> ${product.collection}</p>
              <p class="item_weight"><b>Цвет:</b> ${product.color}</p>
              <p class="item_weight"><b>Материал:</b> ${product.material}</p>
              <p class="item_weight"><b>Размер:</b> ${product.size}</p>
              <p class="item_weight"><b>Толщина:</b> ${product.thickness}</p>
            </div>

            <a class="btn cart_item__remove" href="#" data-id="${product.id}">Удалить</a>
          </td>

          <td class="column_quantity">
            <div class="quantity_box">
              <input style="outline: none; background-color: transparent;" 
                      name="updates[]" 
                      value="${product.quantity}" 
                      class="quantity_input"
                      type="number" 
                      min="1" data-id="${product.id}" />
              <span class="quantity_down" data-id="${product.id}"><i class="fa fa-minus" aria-hidden="true"></i></span>
              <span class="quantity_up" data-id="${product.id}"><i class="fa fa-plus" aria-hidden="true"></i></span>
            </div>
          </td>

        </tr>
      </tbody>
    `;

    cartTable.appendChild(row);

    // Добавляем обработчик события для поля input.quantity_input
    const quantityInput = row.querySelector('.quantity_input');
    quantityInput.addEventListener('input', function (event) {
      const newQuantity = parseInt(event.target.value, 10);
      updateCartQuantity(product.id, newQuantity); // Обновляем количество товара в корзине
    });

    // Увеличиваем общий вес и общую цену
    totalWeight += product.weight * product.quantity;
    // totalPrice += product.price * product.quantity;
  });

  // Выводим общий вес и общую цену на страницу
  cartTotalWeightElement.textContent = `${totalWeight.toFixed(1)} кг`;
  cartTotalPriceElement.textContent = `${totalPrice.toLocaleString()} тг`; // Используем toLocaleString для форматирования числа
}


// Функция для обновления количества товара в корзине
function updateCartQuantity(productId, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = cart.find(product => product.id === productId);

  if (product) {
    product.quantity = newQuantity; // Устанавливаем новое количество товара

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Перезагружаем корзину после обновления
  }
}

document.addEventListener('DOMContentLoaded', loadCart);

// Функция для удаления товара из корзины
function removeFromCart(event) {
  const button = event.target.closest('.cart_item__remove');
  const id = button.getAttribute('data-id');
  console.log('remove')
  console.log(id);

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(product => product.id !== id);

  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  updateCartCount(); // Обновляем количество товаров в корзине
}

// Функции для изменения количества товаров
function updateQuantity(id, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = cart.find(product => product.id === id);

  console.log("updateQuantity", id)

  if (product) {
    product.quantity = Math.max(1, product.quantity + delta); // Минимальное количество - 1
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount(); // Обновляем количество товаров в корзине
  }
}

// Функция для отправки данных на сервер
function sendOrderEmail(note, cart, name, surname, phone) {
  if (note) {
    fetch('https://bigsnab.kz/api-sendOrderMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ note, cart, name, surname, phone })
    })
      .then(response => {
        if (response.ok) {
          alert('Заказ успешно отправлен!');
          // Очистка localStorage после успешной отправки заказа
          localStorage.removeItem('cart');
          loadCart(); // Перезагружаем корзину после удаления
          updateCartCount(); // Обновляем количество товаров в корзине
        } else {
          alert('Ошибка при отправке заказа');
        }
      })
      .catch(error => {
        console.error('Ошибка при отправке запроса:', error);
        alert('Ошибка при отправке заказа');
      });
  } else {
    alert("Укажите заметку к заказу и повторите попытку")
  }
}

// Добавляем обработчик события на кнопку "Отправить"
const checkoutButton = document.querySelector('button[name="checkout"]');
checkoutButton.addEventListener('click', function (event) {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  const name = document.getElementById("cart-name").value;
  const surname = document.getElementById("cart-surname").value;
  const phone = document.getElementById("cart-phone-number").value;
  const note = document.getElementById('cart_note').value;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  sendOrderEmail(note, cart, name, surname, phone);
});

// Добавляем обработчики событий для удаления и изменения количества товаров
document.addEventListener('click', function (event) {
  if (event.target.closest('.cart_item__remove')) {
    removeFromCart(event);
  } else if (event.target.closest('.quantity_down')) {
    const id = event.target.closest('.quantity_down').getAttribute('data-id');
    updateQuantity(id, -1);
  } else if (event.target.closest('.quantity_up')) {
    const id = event.target.closest('.quantity_up').getAttribute('data-id');
    updateQuantity(id, 1);
  }
});

// Функция для обновления количества товаров в корзине
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.length
  const cartCountElement = document.getElementById('openscarts');

  if (cartCountElement) {
    cartCountElement.textContent = `${cartCount}`;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Обновляем количество товаров в корзине каждую секунду
  setInterval(updateCartCount, 500);

  // Обновляем количество товаров в корзине сразу после загрузки страницы
  updateCartCount();
});
