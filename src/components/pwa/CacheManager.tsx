import { useState, useEffect } from 'react';
import { Trash2, Database, RefreshCw, Download } from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';
import { 
  getCacheSize, 
  formatBytes, 
  clearCache, 
  clearAllCaches,
  CACHE_NAMES 
} from '../../utils/pwa/cacheManager';
import { getQueueSize, syncQueue, clearQueue } from '../../utils/pwa/backgroundSync';

export function CacheManager() {
  const [showManager, setShowManager] = useState(false);
  const [cacheStats, setCacheStats] = useState<{
    [key: string]: number;
  }>({});
  const [totalSize, setTotalSize] = useState(0);
  const [queueSize, setQueueSize] = useState(0);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (showManager) {
      loadCacheStats();
    }
  }, [showManager]);

  const loadCacheStats = async () => {
    try {
      const stats: { [key: string]: number } = {};
      
      for (const [name, cacheName] of Object.entries(CACHE_NAMES)) {
        stats[name] = await getCacheSize(cacheName);
      }

      setCacheStats(stats);
      
      const total = Object.values(stats).reduce((sum, size) => sum + size, 0);
      setTotalSize(total);

      const qSize = await getQueueSize();
      setQueueSize(qSize);
    } catch (error) {
      console.error('Failed to load cache stats:', error);
    }
  };

  const handleClearCache = async (cacheName: string) => {
    if (confirm(`Clear ${cacheName} cache?`)) {
      await clearCache(CACHE_NAMES[cacheName as keyof typeof CACHE_NAMES]);
      await loadCacheStats();
    }
  };

  const handleClearAll = async () => {
    if (confirm('Clear all caches? This will remove all offline content.')) {
      await clearAllCaches();
      await loadCacheStats();
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncQueue();
      await loadCacheStats();
    } finally {
      setSyncing(false);
    }
  };

  const handleClearQueue = async () => {
    if (confirm('Clear sync queue?')) {
      await clearQueue();
      await loadCacheStats();
    }
  };

  if (!showManager) {
    return (
      <button
        onClick={() => setShowManager(true)}
        className="fixed bottom-6 left-6 z-40 glass-premium p-4 rounded-full shadow-dramatic hover:scale-110 transition-smooth"
        aria-label="Cache Manager"
        title="Cache Manager"
      >
        <ColorfulIcon
          icon={Database}
          color="purple"
          animation="pulse-glow"
          size={24}
        />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 left-6 w-96 max-h-[600px] z-50 animate-fade-in-up">
      <div className="glass-premium rounded-lg border border-white/20 shadow-cinematic overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="heading-md">Cache Manager</h3>
            <button
              onClick={() => setShowManager(false)}
              className="body-sm text-gray-600 hover:text-black transition-colors"
            >
              Close
            </button>
          </div>
          
          <div className="glass-card p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="body-sm text-gray-600">Total Cache Size</span>
              <span className="heading-sm">{formatBytes(totalSize)}</span>
            </div>
          </div>
        </div>

        {/* Cache Stats */}
        <div className="p-4 max-h-80 overflow-y-auto scrollbar-thin-green">
          <div className="space-y-3">
            {Object.entries(cacheStats).map(([name, size]) => (
              <div key={name} className="glass-subtle p-4 rounded-lg hover-lift-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="heading-sm text-sm mb-1">{name}</h4>
                    <p className="body-xs text-gray-500">
                      {CACHE_NAMES[name as keyof typeof CACHE_NAMES]}
                    </p>
                  </div>
                  <button
                    onClick={() => handleClearCache(name)}
                    className="p-2 hover:bg-white rounded-lg transition-smooth"
                    title="Clear cache"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                      style={{
                        width: `${totalSize > 0 ? (size / totalSize) * 100 : 0}%`
                      }}
                    />
                  </div>
                  <span className="body-xs text-gray-600 ml-3">
                    {formatBytes(size)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Sync Queue */}
          {queueSize > 0 && (
            <div className="glass-subtle p-4 rounded-lg hover-lift-sm mt-3">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="heading-sm text-sm mb-1">Sync Queue</h4>
                  <p className="body-xs text-gray-500">
                    {queueSize} pending {queueSize === 1 ? 'request' : 'requests'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSync}
                    disabled={syncing}
                    className="p-2 hover:bg-white rounded-lg transition-smooth"
                    title="Sync now"
                  >
                    <RefreshCw
                      className={`h-4 w-4 text-blue-600 ${syncing ? 'animate-spin' : ''}`}
                    />
                  </button>
                  <button
                    onClick={handleClearQueue}
                    className="p-2 hover:bg-white rounded-lg transition-smooth"
                    title="Clear queue"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-white/10 bg-white/5 space-y-2">
          <button
            onClick={loadCacheStats}
            className="btn-outline-award w-full btn-sm-award"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Stats
          </button>
          
          <button
            onClick={handleClearAll}
            className="btn-outline-award w-full btn-sm-award text-red-600 border-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Clear All Caches
          </button>

          <div className="pt-2 border-t border-white/10">
            <p className="body-xs text-gray-500 text-center">
              Caches improve performance and enable offline access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
