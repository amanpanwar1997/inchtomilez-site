/**
 * Background Sync Utilities
 * Queues requests when offline and syncs when connection restored
 */

const SYNC_QUEUE_NAME = 'inchtomilez-sync-queue';

export interface QueuedRequest {
  id: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
  timestamp: number;
}

/**
 * Add request to sync queue
 */
export async function queueRequest(
  url: string,
  options: RequestInit = {}
): Promise<void> {
  const queue = await getQueue();
  
  const queuedRequest: QueuedRequest = {
    id: Date.now().toString(),
    url,
    method: options.method || 'GET',
    headers: options.headers as Record<string, string> || {},
    body: options.body?.toString(),
    timestamp: Date.now()
  };

  queue.push(queuedRequest);
  await saveQueue(queue);

  // Register background sync if supported
  if ('serviceWorker' in navigator && 'sync' in navigator.serviceWorker) {
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register('sync-queue');
  } else {
    // Fallback: try to sync immediately
    syncQueue();
  }
}

/**
 * Get sync queue from IndexedDB
 */
async function getQueue(): Promise<QueuedRequest[]> {
  const stored = localStorage.getItem(SYNC_QUEUE_NAME);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save sync queue to IndexedDB
 */
async function saveQueue(queue: QueuedRequest[]): Promise<void> {
  localStorage.setItem(SYNC_QUEUE_NAME, JSON.stringify(queue));
}

/**
 * Process sync queue
 */
export async function syncQueue(): Promise<void> {
  const queue = await getQueue();
  if (queue.length === 0) return;

  console.log(`Processing ${queue.length} queued requests...`);

  const results = await Promise.allSettled(
    queue.map(async (req) => {
      try {
        const response = await fetch(req.url, {
          method: req.method,
          headers: req.headers,
          body: req.body
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return { id: req.id, success: true };
      } catch (error) {
        console.error(`Failed to sync request ${req.id}:`, error);
        return { id: req.id, success: false };
      }
    })
  );

  // Remove successful requests from queue
  const successfulIds = results
    .filter((r): r is PromiseFulfilledResult<{id: string; success: boolean}> => 
      r.status === 'fulfilled' && r.value.success
    )
    .map(r => r.value.id);

  const updatedQueue = queue.filter(req => !successfulIds.includes(req.id));
  await saveQueue(updatedQueue);

  console.log(`Synced ${successfulIds.length}/${queue.length} requests`);
}

/**
 * Clear sync queue
 */
export async function clearQueue(): Promise<void> {
  await saveQueue([]);
}

/**
 * Get queue size
 */
export async function getQueueSize(): Promise<number> {
  const queue = await getQueue();
  return queue.length;
}

/**
 * Queue form submission
 */
export async function queueFormSubmission(
  formData: FormData,
  endpoint: string
): Promise<void> {
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });

  await queueRequest(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

/**
 * Show sync status notification
 */
export function showSyncNotification(synced: number, total: number) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Sync Complete', {
      body: `Successfully synced ${synced} of ${total} pending requests`,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png'
    });
  }
}
