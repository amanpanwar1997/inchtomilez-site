import { motion } from 'motion/react';

// Shimmer effect component for loading states and highlights
export function ShimmerEffect({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}

// Floating particles effect
export function FloatingParticles({ count = 5 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#baff00]/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

// Glow effect component
export function GlowEffect({ 
  color = 'baff00',
  intensity = 0.3,
  className = ''
}: { 
  color?: string;
  intensity?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 50%, rgba(186, 255, 0, ${intensity}), transparent 70%)`
      }}
      animate={{
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
}

// Ripple effect on hover
export function RippleEffect() {
  return (
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-[#baff00]/30"
      initial={{ scale: 0, opacity: 0.8 }}
      animate={{ scale: 2, opacity: 0 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeOut'
      }}
    />
  );
}

// Beam effect for highlighting sections
export function BeamEffect({ 
  direction = 'horizontal',
  className = ''
}: { 
  direction?: 'horizontal' | 'vertical';
  className?: string;
}) {
  const isHorizontal = direction === 'horizontal';
  
  return (
    <div className={`absolute ${isHorizontal ? 'inset-y-0' : 'inset-x-0'} overflow-hidden ${className}`}>
      <motion.div
        className={`absolute ${isHorizontal ? 'h-full w-1' : 'w-full h-1'} bg-gradient-to-${isHorizontal ? 'b' : 'r'} from-transparent via-[#baff00]/50 to-transparent`}
        initial={{ [isHorizontal ? 'x' : 'y']: '-100%' }}
        animate={{ [isHorizontal ? 'x' : 'y']: '200%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 4,
          ease: 'linear'
        }}
      />
    </div>
  );
}

// Gradient border animation
export function AnimatedBorder({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 rounded-3xl ${className}`}
      style={{
        background: 'linear-gradient(135deg, transparent, rgba(186,255,0,0.3), transparent)',
        backgroundSize: '200% 200%'
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
}

// Spotlight effect
export function SpotlightEffect({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: 'radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(186, 255, 0, 0.1), transparent 80%)'
      }}
    />
  );
}