// Регистрация Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful');
            })
            .catch((err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Обработка установки PWA
let deferredPrompt;
const installButton = document.getElementById('installPwa');

window.addEventListener('beforeinstallprompt', (e) => {
    // Предотвращаем показ стандартного диалога установки
    e.preventDefault();
    // Сохраняем событие для последующего использования
    deferredPrompt = e;
    // Показываем кнопку установки
    if (installButton) {
        installButton.style.display = 'block';
    }
});

// Обработчик клика по кнопке установки
if (installButton) {
    installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
            // Показываем диалог установки
            deferredPrompt.prompt();
            // Ждем ответа пользователя
            const { outcome } = await deferredPrompt.userChoice;
            // Очищаем сохраненное событие
            deferredPrompt = null;
            // Скрываем кнопку установки
            installButton.style.display = 'none';
        }
    });
}

// Обработка успешной установки
window.addEventListener('appinstalled', () => {
    // Скрываем кнопку установки
    if (installButton) {
        installButton.style.display = 'none';
    }
    // Очищаем сохраненное событие
    deferredPrompt = null;
    // Показываем уведомление об успешной установке
    if (typeof showNotification === 'function') {
        showNotification('Приложение успешно установлено!');
    }
}); 