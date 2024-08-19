document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
        const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-color'); // Получите цвет темы из CSS
        document.title = (themeColor === '#000000') ? "DStone" : "DStone"; // Измените title в зависимости от цвета темы
    }
});
