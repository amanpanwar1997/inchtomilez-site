import { ReactNode } from 'react';

interface Scroll3DWrapperProps {
  children: ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function Scroll3DWrapper({ 
  children, 
  className = '', 
  intensity = 'subtle',
  direction = 'up'
}: Scroll3DWrapperProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
