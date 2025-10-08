import { Loader2, Sparkles } from 'lucide-react';
import { ColorfulIcon } from './ColorfulIcon';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingScreen({ 
  message = 'Loading...', 
  fullScreen = true 
}: LoadingScreenProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Animated Logo/Icon */}
      <div className="relative">
        <ColorfulIcon
          icon={Sparkles}
          color="blue"
          animation="pulse-glow"
          size={48}
        />
        <div className="absolute inset-0 animate-pulse-glow">
          <ColorfulIcon
            icon={Sparkles}
            color="purple"
            size={48}
            className="opacity-50"
          />
        </div>
      </div>

      {/* Loading Dots */}
      <div className="loader-dots">
        <div className="loader-dot" />
        <div className="loader-dot" />
        <div className="loader-dot" />
      </div>

      {/* Loading Message */}
      <p className="body-lg text-gray-600 animate-pulse">
        {message}
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-shimmer" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-12">
      {content}
    </div>
  );
}

/**
 * Inline Loading Spinner (for buttons, etc.)
 */
export function LoadingSpinner({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <Loader2 
      className={`animate-spin ${className}`}
      size={size}
    />
  );
}

/**
 * Loading Skeleton (for content placeholders)
 */
export function LoadingSkeleton({ 
  className = '',
  count = 1 
}: { 
  className?: string;
  count?: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton-loader ${className}`} />
      ))}
    </>
  );
}
