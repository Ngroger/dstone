// Функция для отправки заказа
async function sendOrder() {
  // Получаем данные формы
  const name = document.getElementById('cart-name').value.trim();
  const surname = document.getElementById('cart-surname').value.trim();
  const phone = document.getElementById('cart-phone-nubmer').value.trim();
  const note = document.getElementById('cart_note').value.trim();

  // Получаем корзину из локального хранилища
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Проверка на пустую корзину или незаполненные поля
  if (cart.length === 0) {
    alert('Корзина пуста. Пожалуйста, добавьте товары в корзину.');
    return;
  }

  if (!name || !surname || !phone) {
    alert('Пожалуйста, заполните все обязательные поля.');
    return;
  }

  // Подготовка данных для отправки на сервер
  const orderData = {
    name,
    surname,
    phone,
    note,
    cart,
  };

  try {
    // Отправка данных на сервер
    const response = await fetch('https://bigsnab.kz/api-sendOrderMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    console.log("response: ", response);

    const responseJson = await response.json();

    console.log("responseJson: ", responseJson);

    if (responseJson.success) {
      // Очистка корзины и полей формы
      alert("Заявка успешно отправлена");
      clearCart();
      clearFormFields();
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Ошибка при отправке заказа. Попробуйте еще раз.');
  }
}

// Функция для очистки корзины
function clearCart() {
  localStorage.removeItem('cart');
  loadCart(); // Обновляем отображение корзины
}

// Функция для очистки полей формы
function clearFormFields() {
  document.getElementById('cart-name').value = '';
  document.getElementById('cart-surname').value = '';
  document.getElementById('cart-phone-nubmer').value = '';
  document.getElementById('cart_note').value = '';
}

// Добавляем обработчик клика на кнопку "Отправить"
document.querySelector('button[name="checkout"]').addEventListener('click', (event) => {
  event.preventDefault(); // Предотвращаем стандартное поведение формы
  sendOrder(); // Вызываем функцию отправки заказа
});
