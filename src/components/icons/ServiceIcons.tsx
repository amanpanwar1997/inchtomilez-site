/**
 * ANIMATED SERVICE ICONS
 * Colorful animated icons for services with smooth transitions
 * NO circular rotations - only float, scale, and fade animations
 */

import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  Icon: LucideIcon;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  animation?: 'float' | 'scale' | 'pulse' | 'none';
  className?: string;
}

const sizeClasses = {
  sm: 'w-10 h-10 p-2',
  md: 'w-12 h-12 p-2.5',
  lg: 'w-16 h-16 p-3'
};

const iconSizes = {
  sm: 'w-6 h-6',
  md: 'w-7 h-7',
  lg: 'w-10 h-10'
};

export const AnimatedServiceIcon = ({ 
  Icon, 
  color, 
  size = 'md', 
  animation = 'float',
  className = '' 
}: AnimatedIconProps) => {
  const animations = {
    float: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    scale: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    pulse: {
      opacity: [1, 0.7, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    none: {}
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} icon-container-glass rounded-[10px] flex items-center justify-center ${className}`}
      whileHover={{ 
        scale: 1.1,
        y: -4,
        transition: { duration: 0.3 }
      }}
      animate={animations[animation]}
    >
      <Icon 
        className={iconSizes[size]} 
        style={{ color }} 
        strokeWidth={2}
      />
    </motion.div>
  );
};

// Pre-configured service icons with colors
export const iconColors = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC05',
  green: '#34A853',
  purple: '#9333EA',
  orange: '#FF9900',
  pink: '#EC4899',
  teal: '#14B8A6',
  indigo: '#6366F1',
  cyan: '#06B6D4'
};