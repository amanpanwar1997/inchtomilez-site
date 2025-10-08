import { ReactNode, HTMLAttributes, MouseEvent, useState } from 'react';

interface InnovativeCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  effect?: '3d-tilt' | 'magnetic' | 'flip' | 'expand' | 'slide-reveal' | 'glow-border' | 'particles' | 'none';
  flipContent?: ReactNode;
  glassStyle?: 'card' | 'strong' | 'subtle' | 'ultra' | 'premium';
}

export function InnovativeCard({
  children,
  effect = 'none',
  flipContent,
  glassStyle = 'premium',
  className = '',
  ...props
}: InnovativeCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (effect === 'magnetic') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 10;
      const y = (e.clientY - rect.top - rect.height / 2) / 10;
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    if (effect === 'magnetic') {
      setMousePosition({ x: 0, y: 0 });
    }
  };

  const effectClass = effect !== 'none' ? `card-${effect}` : '';
  const glassClass = `glass-${glassStyle}`;

  if (effect === 'flip' && flipContent) {
    return (
      <div className={`card-flip ${className}`} {...props}>
        <div className="card-flip-inner">
          <div className={`card-flip-front ${glassClass} p-6`}>
            {children}
          </div>
          <div className={`card-flip-back ${glassClass} p-6`}>
            {flipContent}
          </div>
        </div>
      </div>
    );
  }

  if (effect === 'slide-reveal') {
    return (
      <div className={`card-slide-reveal ${glassClass} ${className}`} {...props}>
        <div className="p-6">
          {children}
        </div>
        {flipContent && (
          <div className="card-slide-reveal-content glass-premium p-6">
            {flipContent}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${effectClass} ${glassClass} ${className}`}
      style={
        effect === 'magnetic'
          ? {
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
