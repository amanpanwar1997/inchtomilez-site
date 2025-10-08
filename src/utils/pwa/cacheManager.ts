/**
 * Advanced Cache Management for PWA
 * Handles intelligent caching strategies
 */

export const CACHE_NAMES = {
  STATIC: 'inchtomilez-static-v1',
  DYNAMIC: 'inchtomilez-dynamic-v1',
  IMAGES: 'inchtomilez-images-v1',
  API: 'inchtomilez-api-v1'
};

export const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

/**
 * Cache First Strategy
 * Good for static assets that rarely change
 */
export async function cacheFirst(request: Request, cacheName: string): Promise<Response> {
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
    console.error('Cache first strategy failed:', error);
    throw error;
  }
}

/**
 * Network First Strategy
 * Good for dynamic content that changes frequently
 */
export async function networkFirst(request: Request, cacheName: string, timeout = 3000): Promise<Response> {
  const cache = await caches.open(cacheName);

  try {
    // Race between network and timeout
    const networkResponse = await Promise.race([
      fetch(request),
      new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Error('Network timeout')), timeout)
      )
    ]);

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
    throw error;
  }
}

/**
 * Stale While Revalidate
 * Returns cached version immediately while updating in background
 */
export async function staleWhileRevalidate(request: Request, cacheName: string): Promise<Response> {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  // Fetch from network in background
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  // Return cached version immediately, or wait for network
  return cachedResponse || fetchPromise;
}

/**
 * Precache static assets
 */
export async function precacheAssets(assets: string[]): Promise<void> {
  const cache = await caches.open(CACHE_NAMES.STATIC);
  await cache.addAll(assets);
}

/**
 * Clean up old caches
 */
export async function cleanupOldCaches(): Promise<void> {
  const cacheWhitelist = Object.values(CACHE_NAMES);
  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames.map(cacheName => {
      if (!cacheWhitelist.includes(cacheName)) {
        console.log('Deleting old cache:', cacheName);
        return caches.delete(cacheName);
      }
    })
  );
}

/**
 * Get cache size
 */
export async function getCacheSize(cacheName?: string): Promise<number> {
  if (cacheName) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    let size = 0;

    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        size += blob.size;
      }
    }

    return size;
  } else {
    // Total size across all caches
    const cacheNames = await caches.keys();
    let totalSize = 0;

    for (const name of cacheNames) {
      totalSize += await getCacheSize(name);
    }

    return totalSize;
  }
}

/**
 * Clear specific cache
 */
export async function clearCache(cacheName: string): Promise<void> {
  await caches.delete(cacheName);
}

/**
 * Clear all caches
 */
export async function clearAllCaches(): Promise<void> {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
}

/**
 * Get cached URLs
 */
export async function getCachedUrls(cacheName: string): Promise<string[]> {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  return keys.map(request => request.url);
}

/**
 * Format bytes to human readable
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
