// Инициализация i18next
i18next
    .use(i18nextHttpBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
        fallbackLng: 'ru',
        backend: {
        loadPath: '/locales/{{lng}}/translation.json'
        }
    }, function(err, t) {
        updateContent();
    });

    // Функция для обновления содержимого на странице
    function updateContent() {
        document.querySelector('.header_cart a').textContent = `0 ${i18next.t('menu.cart')}`;
        document.querySelectorAll('#megamenu .level_1__link').forEach((element, index) => {
            const keys = ['main', 'catalog', 'about-us', 'contacts'];
            element.textContent = i18next.t(`menu.${keys[index]}`);
    });
  // Добавьте другие элементы, которые нужно обновить, аналогичным образом
}
