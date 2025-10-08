import { useEffect, useState } from 'react';
import { InstallPrompt } from './InstallPrompt';
import { NotificationManager } from './NotificationManager';
import { CacheManager } from './CacheManager';

export function PWAManager() {
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('✅ Service Worker registered:', registration.scope);

            // Check for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    setUpdateAvailable(true);
                    console.log('🔄 New version available!');
                  }
                });
              }
            });

            // Check for updates periodically (every hour)
            setInterval(() => {
              registration.update();
            }, 60 * 60 * 1000);
          })
          .catch((error) => {
            console.error('❌ Service Worker registration failed:', error);
          });
      });
    }

    // Monitor online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      console.log('🌐 Back online!');
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('📴 Offline mode');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  };

  return (
    <>
      {/* Install Prompt */}
      <InstallPrompt />

      {/* Notification Manager */}
      <NotificationManager />

      {/* Cache Manager */}
      <CacheManager />

      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 shadow-xl">
          <div className="container-award flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
            </svg>
            <span className="body-sm font-semibold">You're offline. Some features may be limited.</span>
          </div>
        </div>
      )}

      {/* Update Available Banner */}
      {updateAvailable && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-50 animate-fade-in-up">
          <div className="glass-premium p-4 rounded-lg border border-white/20 shadow-dramatic flex items-center gap-4">
            <div className="flex-1">
              <h4 className="heading-sm mb-1">Update Available</h4>
              <p className="body-xs text-gray-600">A new version is ready to install</p>
            </div>
            <button
              onClick={handleUpdate}
              className="btn-award btn-sm-award"
            >
              Update
            </button>
          </div>
        </div>
      )}

      {/* Add to Manifest Link */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#1a1a1a" />
      
      {/* Apple Touch Icon */}
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      
      {/* iOS Meta Tags */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="InchToMilez" />
      
      {/* Microsoft Tile */}
      <meta name="msapplication-TileColor" content="#1a1a1a" />
      <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
    </>
  );
}
