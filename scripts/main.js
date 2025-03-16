// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    initDateTime();
    initPageTitle();
    initNavigation();
});

// Обновление времени и даты
function initDateTime() {
    function updateDateTime() {
        const now = new Date();
        const timeElement = document.querySelector('.status-bar__time');
        const weekdayElement = document.querySelector('.status-bar__weekday');
        
        // Форматирование времени
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
        
        // Получение дня недели
        const weekdays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        weekdayElement.textContent = weekdays[now.getDay()];
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// Управление заголовком страницы
function initPageTitle() {
    const pageTitle = document.querySelector('.page-title');
    const titleInput = document.querySelector('.title-input');
    const pageName = document.body.dataset.page || 'page';

    // Загрузка сохраненного заголовка
    const savedTitle = localStorage.getItem(`${pageName}PageTitle`);
    if (savedTitle) {
        pageTitle.textContent = savedTitle;
        titleInput.value = savedTitle;
        document.title = savedTitle;
    }

    // Редактирование заголовка
    pageTitle.addEventListener('click', () => {
        titleInput.value = pageTitle.textContent;
        pageTitle.style.display = 'none';
        titleInput.style.display = 'block';
        titleInput.focus();
        titleInput.select();
    });

    // Сохранение изменений
    function saveTitle() {
        const newTitle = titleInput.value.trim();
        if (newTitle) {
            pageTitle.textContent = newTitle;
            document.title = newTitle;
            localStorage.setItem(`${pageName}PageTitle`, newTitle);
        }
        titleInput.style.display = 'none';
        pageTitle.style.display = 'block';
    }

    titleInput.addEventListener('blur', saveTitle);
    titleInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            titleInput.blur();
        }
    });
}

// Управление навигацией
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pageName = document.body.dataset.page || 'page';
    
    navItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            localStorage.setItem('lastActivePage', pageName);
        });
    });
} 