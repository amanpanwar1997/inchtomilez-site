import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  animation?: 'float' | 'pulse' | 'bounce' | 'rotate' | 'spin' | 'swing' | 'scale';
  size?: number;
  className?: string;
  delay?: number;
}

export function AnimatedIcon({ 
  icon: Icon, 
  animation = 'float', 
  size = 24, 
  className = '',
  delay = 0
}: AnimatedIconProps) {
  
  const animations = {
    float: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    pulse: {
      scale: [1, 1.15, 1],
      transition: {
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    bounce: {
      y: [0, -12, 0, -6, 0],
      transition: {
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeOut"
      }
    },
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        delay,
        repeat: Infinity,
        ease: "linear"
      }
    },
    spin: {
      rotate: [0, 180, 0, -180, 0],
      transition: {
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    swing: {
      rotate: [0, 15, 0, -15, 0],
      transition: {
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    scale: {
      scale: [1, 1.2, 1, 0.9, 1],
      transition: {
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`inline-flex ${className}`}
      animate={animations[animation]}
    >
      <Icon size={size} />
    </motion.div>
  );
}

// Animated Icon with Background Glow
export function AnimatedIconWithGlow({ 
  icon: Icon, 
  animation = 'float', 
  size = 24, 
  className = '',
  delay = 0
}: AnimatedIconProps) {
  return (
    <motion.div
      className={`relative inline-flex ${className}`}
      animate={{
        ...animations[animation]
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 blur-xl bg-black/10 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 2,
          delay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <Icon size={size} className="relative z-10" />
    </motion.div>
  );
}

const animations = {
  float: {
    y: [0, -8, 0],
  },
  pulse: {
    scale: [1, 1.15, 1],
  },
  bounce: {
    y: [0, -12, 0, -6, 0],
  },
  rotate: {
    rotate: [0, 360],
  },
  spin: {
    rotate: [0, 180, 0, -180, 0],
  },
  swing: {
    rotate: [0, 15, 0, -15, 0],
  },
  scale: {
    scale: [1, 1.2, 1, 0.9, 1],
  }
};