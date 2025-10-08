/**
 * Global Error Handler
 * Centralized error handling and logging
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Log error to console with context
 */
export function logError(error: Error | AppError, context?: string): void {
  const timestamp = new Date().toISOString();
  const errorData = {
    timestamp,
    context: context || 'Unknown',
    message: error.message,
    name: error.name,
    stack: error.stack,
    ...(error instanceof AppError && {
      code: error.code,
      severity: error.severity
    })
  };

  console.error('🔴 Error:', errorData);

  // In production, send to error tracking service
  // sendToErrorTracking(errorData);
}

/**
 * Handle async errors with try-catch
 */
export async function handleAsync<T>(
  promise: Promise<T>,
  errorMessage?: string
): Promise<[T | null, Error | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logError(err, errorMessage);
    return [null, err];
  }
}

/**
 * Safe localStorage operations
 */
export const safeStorage = {
  get: (key: string, defaultValue: any = null): any => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      logError(error as Error, `localStorage.get: ${key}`);
      return defaultValue;
    }
  },

  set: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      logError(error as Error, `localStorage.set: ${key}`);
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      logError(error as Error, `localStorage.remove: ${key}`);
      return false;
    }
  },

  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      logError(error as Error, 'localStorage.clear');
      return false;
    }
  }
};

/**
 * Validate required environment variables
 */
export function validateEnv(requiredVars: string[]): void {
  const missing = requiredVars.filter(
    varName => !process.env[varName]
  );

  if (missing.length > 0) {
    throw new AppError(
      `Missing required environment variables: ${missing.join(', ')}`,
      'ENV_VALIDATION_ERROR',
      'critical'
    );
  }
}

/**
 * Retry failed operations
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    backoff?: boolean;
  } = {}
): Promise<T> {
  const { retries = 3, delay = 1000, backoff = true } = options;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      
      const waitTime = backoff ? delay * Math.pow(2, i) : delay;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw new Error('Retry limit exceeded');
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
