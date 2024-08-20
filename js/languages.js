document.addEventListener('DOMContentLoaded', function () {
    const selectedLanguage = document.getElementById('selected_language');
    const languageButtons = document.querySelectorAll('.select-language');

    // Function to get cookie by name
    function getCookie(name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
    }

    // Function to set cookie
    function setCookie(name, value, days) {
        let expires = '';
        let sameSite = '; SameSite=Strict'; // добавляем SameSite=Strict

        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }

        document.cookie = name + '=' + (value || '') + expires + '; path=/' + sameSite; // добавляем sameSite к строке cookie
    }

    // Initialize language from cookie or default to 'RU'
    let lang = getCookie('lang');
    if (!lang) {
        lang = 'RU';
        setCookie('lang', lang, 7); // Set default language to 'RU' for 7 days
    }
    selectedLanguage.innerHTML = `${lang}`;

    // Event listener for language selection
    languageButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedLang = this.getAttribute('data-lang');
            console.log(selectedLang); // Теперь должно выводиться значение lang в консоль
            selectedLanguage.innerHTML = `${selectedLang}`;
            setCookie('lang', selectedLang, 7);
            window.location.reload();
        });
    });
});
