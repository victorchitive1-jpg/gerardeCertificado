const CACHE_NAME = 'chitsongo-v3.0'; // Altere apenas este valor a cada nova atualização

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './Emblema.svg'
  // Lembre-se de adicionar aqui o ficheiro do SheetJS se quiser suporte 100% offline
];

// Instalação do Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Força a nova versão a ser instalada de imediato
});

// Ativação e eliminação automática de caches antigos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim(); // Assume o controlo das páginas abertas imediatamente
});

// Interceção de pedidos (Rede / Cache)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
