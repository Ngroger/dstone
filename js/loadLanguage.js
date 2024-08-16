// Function to get the value of a cookie by name
function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    } else {
        return null;
    }
}

// Function to load JSON files
function loadJSON(path, callback) {
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', path, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(null);
}

// Function to update UI elements with new translation
function updateUI(translation) {
    const mainButtonTitle = document.getElementById("mainButtonTitle");
    const catalogButtonTitle = document.getElementById("catalogButtonTitle");
    const aboutUsButtonTitle = document.getElementById("aboutUsButtonTitle");
    const contactsButtonTitle = document.getElementById("contactsButtonTitle");
    const cartButtonTitle = document.getElementById("openscarts");

    if (translation.menu) {
        mainButtonTitle.textContent = translation.menu.main;
        catalogButtonTitle.textContent = translation.menu.catalog;
        aboutUsButtonTitle.textContent = translation.menu["about-us"];
        contactsButtonTitle.textContent = translation.menu.contacts;
        cartButtonTitle.textContent = `0 ${translation.menu.cart}`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const lang = getCookie('lang') || 'RU';
    let translationFile;
    switch (lang) {
        case 'ENG':
            translationFile = '../locales/eng/translation.json';
            break;
        case 'KZ':
            translationFile = '../locales/kz/translation.json';
            break;
        case 'RU':
        default:
            translationFile = '../locales/ru/translation.json';
            break;
    }

    loadJSON(translationFile, function (translation) {
        updateUI(translation);
    });
});
