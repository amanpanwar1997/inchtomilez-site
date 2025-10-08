import { ReactNode } from 'react';

interface StackedScrollSectionProps {
  children: ReactNode;
  index: number;
  totalSections: number;
  className?: string;
  backgroundColor?: string;
}

export function StackedScrollSection({ 
  children, 
  index, 
  totalSections,
  className = '',
  backgroundColor = 'bg-white'
}: StackedScrollSectionProps) {
  // Each section has higher z-index than the previous
  const zIndex = totalSections - index;

  return (
    <div className="relative">
      <div
        className={`w-full overflow-hidden ${backgroundColor} ${className}`}
        style={{ 
          zIndex,
        }}
      >
        <div className="h-full w-full relative">
          {children}
        </div>
      </div>
    </div>
  );
}

interface StackedScrollContainerProps {
  children: ReactNode;
  className?: string;
}

export function StackedScrollContainer({ children, className = '' }: StackedScrollContainerProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}
