import { useState, useEffect } from 'react';
import { Bell, BellOff, X, Check } from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';

interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  icon?: string;
  url?: string;
}

export function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showCenter, setShowCenter] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Load notifications from localStorage
    const stored = localStorage.getItem('pwa-notifications');
    if (stored) {
      const parsed = JSON.parse(stored);
      setNotifications(parsed.map((n: any) => ({
        ...n,
        timestamp: new Date(n.timestamp)
      })));
    }

    // Listen for push events
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
    }

    return () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
      }
    };
  }, []);

  useEffect(() => {
    // Calculate unread count
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);

    // Save to localStorage
    localStorage.setItem('pwa-notifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleServiceWorkerMessage = (event: MessageEvent) => {
    if (event.data && event.data.type === 'PUSH_NOTIFICATION') {
      addNotification(event.data.notification);
    }
  };

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);

    if (result === 'granted') {
      subscribeToPush();
      showLocalNotification(
        'Notifications Enabled!',
        'You\'ll now receive updates from InchToMilez'
      );
    }
  };

  const subscribeToPush = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Push notifications not supported');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Check if already subscribed
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log('Already subscribed to push notifications');
        return;
      }

      // Subscribe to push notifications
      // Note: In production, you'd need a real VAPID public key
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BEl62iUYgUivxIkv69yViEuiBIa-Ib37J8xQmrSujgOXEw6gVEYk2vGdA7LqVRPUjVNxr3hQC3L3Qc_hDkv1VhY'
        )
      });

      console.log('Subscribed to push notifications:', subscription);
      
      // In production, send subscription to your backend
      // await sendSubscriptionToBackend(subscription);
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const showLocalNotification = (title: string, body: string, url?: string) => {
    if (permission !== 'granted') return;

    // Browser notification
    const notification = new Notification(title, {
      body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [200, 100, 200],
      tag: Date.now().toString(),
      requireInteraction: false
    });

    notification.onclick = () => {
      window.focus();
      if (url) {
        window.location.href = url;
      }
      notification.close();
    };

    // Add to notification center
    addNotification({
      id: Date.now().toString(),
      title,
      body,
      timestamp: new Date(),
      read: false,
      url
    });
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: Notification = {
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
      ...notif
    };

    setNotifications(prev => [newNotif, ...prev].slice(0, 50)); // Keep last 50
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Demo: Send test notification
  const sendTestNotification = () => {
    showLocalNotification(
      'Test Notification',
      'This is a test notification from InchToMilez PWA!',
      '/'
    );
  };

  return (
    <>
      {/* Notification Bell Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          onClick={() => setShowCenter(!showCenter)}
          className="relative glass-premium p-4 rounded-full shadow-dramatic hover:scale-110 transition-smooth"
          aria-label="Notifications"
        >
          <ColorfulIcon
            icon={Bell}
            color="blue"
            animation="swing"
            size={24}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-award animate-pulse-glow">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification Center Panel */}
      {showCenter && (
        <div className="fixed bottom-40 right-6 w-96 max-h-[600px] z-50 animate-fade-in-up">
          <div className="glass-premium rounded-lg border border-white/20 shadow-cinematic overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="heading-md">Notifications</h3>
                <button
                  onClick={() => setShowCenter(false)}
                  className="p-2 hover:bg-white hover:shadow-award rounded-lg transition-smooth"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Permission Request */}
              {permission === 'default' && (
                <button
                  onClick={requestPermission}
                  className="btn-award w-full btn-sm-award mb-2"
                >
                  <Bell className="h-4 w-4" />
                  Enable Notifications
                </button>
              )}

              {permission === 'denied' && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-2">
                  <p className="body-xs text-red-600">
                    Notifications are blocked. Please enable them in your browser settings.
                  </p>
                </div>
              )}

              {permission === 'granted' && (
                <div className="flex gap-2">
                  <button
                    onClick={markAllAsRead}
                    className="btn-outline-award flex-1 btn-sm-award"
                    disabled={unreadCount === 0}
                  >
                    <Check className="h-4 w-4" />
                    Mark All Read
                  </button>
                  <button
                    onClick={sendTestNotification}
                    className="btn-outline-award flex-1 btn-sm-award"
                  >
                    Test
                  </button>
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto scrollbar-thin-green">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <ColorfulIcon
                    icon={BellOff}
                    color="gray"
                    size={48}
                    className="mx-auto mb-4 opacity-30"
                  />
                  <p className="body-md text-gray-500">No notifications yet</p>
                  <p className="body-sm text-gray-400 mt-2">
                    We'll notify you about updates and offers
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 hover:bg-white/5 transition-smooth cursor-pointer ${
                        !notif.read ? 'bg-blue-50/10' : ''
                      }`}
                      onClick={() => {
                        markAsRead(notif.id);
                        if (notif.url) {
                          window.location.href = notif.url;
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="heading-sm text-sm">
                              {notif.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notif.id);
                              }}
                              className="p-1 hover:bg-white rounded transition-smooth"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="body-sm text-gray-600 mb-2">
                            {notif.body}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="body-xs text-gray-400">
                              {formatTimestamp(notif.timestamp)}
                            </span>
                            {!notif.read && (
                              <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-white/10 bg-white/5">
                <button
                  onClick={clearAll}
                  className="w-full body-sm text-gray-600 hover:text-black transition-colors"
                >
                  Clear All Notifications
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}
