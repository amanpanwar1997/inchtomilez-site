import { ReactNode } from 'react';
import { useToast, ToastContainer } from './ui/Toast';

/**
 * Global Toast Provider
 * Wraps the app to provide toast notifications everywhere
 */

// Create a global toast manager
let globalToastManager: ReturnType<typeof useToast> | null = null;

export function GlobalToastProvider({ children }: { children: ReactNode }) {
  const toastManager = useToast();
  
  // Store reference globally so other components can use it
  globalToastManager = toastManager;

  return (
    <>
      <ToastContainer toasts={toastManager.toasts} onClose={toastManager.remove} />
      {children}
    </>
  );
}

/**
 * Global toast helper functions
 * Can be called from anywhere in the app
 */
export const toast = {
  success: (message: string, duration?: number) => {
    if (globalToastManager) {
      return globalToastManager.success(message, duration);
    }
    console.warn('Toast called before provider initialized');
  },
  
  error: (message: string, duration?: number) => {
    if (globalToastManager) {
      return globalToastManager.error(message, duration);
    }
    console.warn('Toast called before provider initialized');
  },
  
  warning: (message: string, duration?: number) => {
    if (globalToastManager) {
      return globalToastManager.warning(message, duration);
    }
    console.warn('Toast called before provider initialized');
  },
  
  info: (message: string, duration?: number) => {
    if (globalToastManager) {
      return globalToastManager.info(message, duration);
    }
    console.warn('Toast called before provider initialized');
  }
};
