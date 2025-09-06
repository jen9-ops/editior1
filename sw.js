const CACHE_NAME = 'code-editor-cache-v14';
const APP_SHELL_URLS = [
    './',
    './manifest.json',
    './icon-192x192.png',
    './icon-512x512.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.16/theme/dracula.css',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.js',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/xml/xml.js',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/css/css.js',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/javascript/javascript.js',
    'https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/htmlmixed/htmlmixed.js',
    'https://cdn.jsdelivr.net/npm/codemirror-emmet/emmet.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Кешування оболонки додатку');
            return cache.addAll(APP_SHELL_URLS);
        })
    );
});

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
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
