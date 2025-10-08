// Service Worker for InchToMilez PWA
// Version: 1.0.0

const CACHE_NAMES = {
  STATIC: 'inchtomilez-static-v1',
  DYNAMIC: 'inchtomilez-dynamic-v1',
  IMAGES: 'inchtomilez-images-v1',
  API: 'inchtomilez-api-v1'
};

const OFFLINE_URL = '/offline.html';

// Assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/styles/globals.css',
  '/manifest.json'
];

// Cache strategies configuration
const CACHE_STRATEGIES = {
  static: { strategy: 'cache-first', cacheName: CACHE_NAMES.STATIC },
  dynamic: { strategy: 'network-first', cacheName: CACHE_NAMES.DYNAMIC, timeout: 3000 },
  images: { strategy: 'cache-first', cacheName: CACHE_NAMES.IMAGES },
  api: { strategy: 'network-first', cacheName: CACHE_NAMES.API, timeout: 5000 }
};

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAMES.STATIC).then((cache) => {
        console.log('[Service Worker] Precaching static assets');
        return cache.addAll(PRECACHE_ASSETS);
      }),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  const currentCaches = Object.values(CACHE_NAMES);
  
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => !currentCaches.includes(cacheName))
            .map((cacheName) => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - intelligent caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests (except images from CDNs)
  if (url.origin !== location.origin && !request.destination.includes('image')) {
    return;
  }

  // Determine cache strategy based on request type
  let strategy = CACHE_STRATEGIES.dynamic;
  let cacheName = CACHE_NAMES.DYNAMIC;

  // Static assets (CSS, JS, fonts)
  if (request.destination === 'style' || 
      request.destination === 'script' || 
      request.destination === 'font' ||
      url.pathname.includes('/styles/') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js')) {
    strategy = CACHE_STRATEGIES.static;
    cacheName = CACHE_NAMES.STATIC;
  }
  
  // Images
  else if (request.destination === 'image' || 
           url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/i)) {
    strategy = CACHE_STRATEGIES.images;
    cacheName = CACHE_NAMES.IMAGES;
  }
  
  // API calls
  else if (url.pathname.includes('/api/') || 
           url.pathname.includes('/functions/')) {
    strategy = CACHE_STRATEGIES.api;
    cacheName = CACHE_NAMES.API;
  }

  // Navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstStrategy(request, CACHE_NAMES.DYNAMIC, 3000));
    return;
  }

  // Apply appropriate strategy
  if (strategy.strategy === 'cache-first') {
    event.respondWith(cacheFirstStrategy(request, cacheName));
  } else if (strategy.strategy === 'network-first') {
    event.respondWith(networkFirstStrategy(request, cacheName, strategy.timeout));
  }
});

// Cache-first strategy
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache-first strategy failed:', error);
    // Return offline page for documents
    if (request.destination === 'document') {
      return caches.match(OFFLINE_URL);
    }
    throw error;
  }
}

// Network-first strategy with timeout
async function networkFirstStrategy(request, cacheName, timeout = 3000) {
  const cache = await caches.open(cacheName);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const networkResponse = await fetch(request, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, falling back to cache');
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for documents
    if (request.destination === 'document' || request.mode === 'navigate') {
      return caches.match(OFFLINE_URL);
    }

    throw error;
  }
}

// Background Sync - retry failed requests when online
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  
  if (event.tag === 'sync-queue') {
    event.waitUntil(syncQueue());
  }
});

async function syncQueue() {
  console.log('[Service Worker] Syncing queued requests...');
  
  try {
    // Get queue from localStorage
    const queueData = await clients.matchAll().then(clients => {
      if (clients.length > 0) {
        return clients[0].postMessage({ type: 'GET_SYNC_QUEUE' });
      }
    });

    // Process queue via the backgroundSync utility
    // This will be handled by the client-side code
    console.log('[Service Worker] Sync queue processed');
    
    return Promise.resolve();
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
    return Promise.reject(error);
  }
}

// Push Notification - display notifications
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push received');
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'InchToMilez';
  const options = {
    body: data.body || 'New update available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'default',
    requireInteraction: data.requireInteraction || false,
    actions: data.actions || [
      {
        action: 'view',
        title: 'View',
        icon: '/icons/view-icon.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/dismiss-icon.png'
      }
    ],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click - handle notification actions
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event.action);
  
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // Check if there's already a window open
        for (let client of windowClients) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

// Log version
console.log('[Service Worker] Version 1.0.0 loaded');
