const CACHE_NAME = 'clownades-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/app1.html',
  '/app2.html',
  '/app3.html',
  '/app4.html',
  '/app5.html',
  '/app6.html',
  '/settings.html',
  '/manifest.json',
  '/src/styles/main.css',
  '/src/styles/app1.css',
  '/src/styles/app2.css',
  '/src/styles/app3.css',
  '/src/styles/app4.css',
  '/src/styles/app5.css',
  '/src/styles/statusbar.css',
  '/src/styles/navbar.css',
  '/src/scripts/StatusBar.js',
  // Добавьте все остальные JS файлы
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Установка Service Worker и кэширование файлов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Активация Service Worker и удаление старых кэшей
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Стратегия кэширования: сначала кэш, потом сеть
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Возвращаем кэшированный ответ, если он есть
        if (response) {
          return response;
        }

        // Иначе делаем сетевой запрос
        return fetch(event.request).then(
          (response) => {
            // Проверяем валидность ответа
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Клонируем ответ, так как он может быть использован только один раз
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
}); 