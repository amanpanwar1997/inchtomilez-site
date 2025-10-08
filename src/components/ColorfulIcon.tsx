import { LucideIcon } from 'lucide-react';
import { HTMLAttributes } from 'react';

interface ColorfulIconProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  color?: 'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'orange' | 'pink' | 'teal' | 'indigo' | 'cyan' | 'lime' | 'rose' | 'amber' | 'emerald' | 'violet' | 'fuchsia' | 'rainbow';
  animation?: 'bounce' | 'float' | 'pulse-glow' | 'rotate-y' | 'wobble' | 'swing' | 'jump' | 'heartbeat' | 'shake' | 'flip-in' | 'zoom-pulse' | 'glow-pulse' | 'none';
  hoverAnimation?: 'bounce' | 'rotate' | 'wobble' | 'shake' | 'jump' | 'none';
  size?: number;
  containerGradient?: boolean;
  stagger?: number;
}

export function ColorfulIcon({
  icon: Icon,
  color = 'blue',
  animation = 'float',
  hoverAnimation = 'none',
  size = 24,
  containerGradient = false,
  stagger = 0,
  className = '',
  ...props
}: ColorfulIconProps) {
  const colorClass = color === 'rainbow' 
    ? 'icon-rainbow-gradient' 
    : `icon-color-${color}`;
  
  const animationClass = animation !== 'none' ? `icon-${animation}` : '';
  const hoverAnimationClass = hoverAnimation !== 'none' ? `icon-hover-${hoverAnimation}` : '';
  const staggerClass = stagger > 0 ? `icon-stagger-${stagger}` : '';
  const containerClass = containerGradient ? 'icon-container-gradient' : '';

  return (
    <div 
      className={`inline-flex items-center justify-center ${containerClass} ${className}`}
      {...props}
    >
      <Icon 
        className={`${colorClass} ${animationClass} ${hoverAnimationClass} ${staggerClass}`}
        size={size}
        strokeWidth={2}
      />
    </div>
  );
}
