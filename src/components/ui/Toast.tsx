import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { ColorfulIcon } from '../ColorfulIcon';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export function ToastItem({ toast, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    // Auto dismiss
    const timer = setTimeout(() => {
      handleClose();
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(toast.id);
    }, 300);
  };

  const config = {
    success: {
      icon: CheckCircle,
      color: 'green' as const,
      bgClass: 'bg-green-50 border-green-200',
      textClass: 'text-green-800'
    },
    error: {
      icon: XCircle,
      color: 'red' as const,
      bgClass: 'bg-red-50 border-red-200',
      textClass: 'text-red-800'
    },
    warning: {
      icon: AlertCircle,
      color: 'orange' as const,
      bgClass: 'bg-orange-50 border-orange-200',
      textClass: 'text-orange-800'
    },
    info: {
      icon: Info,
      color: 'blue' as const,
      bgClass: 'bg-blue-50 border-blue-200',
      textClass: 'text-blue-800'
    }
  };

  const { icon: Icon, color, bgClass, textClass } = config[toast.type];

  return (
    <div
      className={`
        glass-premium p-4 rounded-lg border shadow-dramatic
        flex items-start gap-3 min-w-[320px] max-w-md
        transition-all duration-300
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
        ${bgClass}
      `}
    >
      <ColorfulIcon
        icon={Icon}
        color={color}
        animation="pulse-glow"
        size={24}
      />
      
      <p className={`flex-1 body-md ${textClass}`}>
        {toast.message}
      </p>

      <button
        onClick={handleClose}
        className="p-1 hover:bg-white rounded transition-smooth"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onClose }: {
  toasts: Toast[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed top-6 right-6 z-50 space-y-3 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}

// Toast Manager Hook
let toastId = 0;
const toastListeners: Array<(toasts: Toast[]) => void> = [];
let toastQueue: Toast[] = [];

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setToasts(newToasts);
    };

    toastListeners.push(listener);
    listener(toastQueue);

    return () => {
      const index = toastListeners.indexOf(listener);
      if (index > -1) {
        toastListeners.splice(index, 1);
      }
    };
  }, []);

  const addToast = (type: ToastType, message: string, duration?: number) => {
    const id = `toast-${++toastId}`;
    const toast: Toast = { id, type, message, duration };
    
    toastQueue = [...toastQueue, toast];
    toastListeners.forEach(listener => listener(toastQueue));

    return id;
  };

  const removeToast = (id: string) => {
    toastQueue = toastQueue.filter(t => t.id !== id);
    toastListeners.forEach(listener => listener(toastQueue));
  };

  return {
    toasts,
    success: (message: string, duration?: number) => 
      addToast('success', message, duration),
    error: (message: string, duration?: number) => 
      addToast('error', message, duration),
    warning: (message: string, duration?: number) => 
      addToast('warning', message, duration),
    info: (message: string, duration?: number) => 
      addToast('info', message, duration),
    remove: removeToast
  };
}
