window.addEventListener('load', () => {
    const loadPage = document.querySelector('.load_page');
    const mainContent = document.querySelector('.main-content');
    const body = document.body;

    // Делаем страницу неподвижной
    body.style.overflow = 'hidden';

    // Даем время для показа экрана загрузки
    setTimeout(() => {
        loadPage.style.opacity = '0'; // Запускаем эффект fade-out
        setTimeout(() => {
            loadPage.style.display = 'none'; // Убираем элемент после завершения fade-out
            mainContent.style.display = 'block'; // Показываем основной контент
            body.style.overflow = ''; // Возвращаем прокрутку после завершения загрузки
        }, 1000); // Длительность fade-out в CSS (1 секунда)
    }, 2000); // Время показа экрана загрузки (3 секунды)
});
