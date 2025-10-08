import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxGlassSectionProps {
  children: ReactNode;
  className?: string;
  speed?: 'slow' | 'medium' | 'fast';
  glassLevel?: 'subtle' | 'medium' | 'strong' | 'ultra';
  enableParallax?: boolean;
}

export function ParallaxGlassSection({ 
  children, 
  className = '', 
  speed = 'medium',
  glassLevel = 'medium',
  enableParallax = true
}: ParallaxGlassSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Different parallax speeds
  const speedValues = {
    slow: [0, -50],
    medium: [0, -100],
    fast: [0, -150]
  };

  const y = useTransform(scrollYProgress, [0, 1], speedValues[speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const glassClasses = {
    subtle: 'glass-section-light',
    medium: 'glass-section-medium',
    strong: 'glass-section-strong',
    ultra: 'glass-ultra'
  };

  if (!enableParallax) {
    return (
      <div ref={ref} className={`relative ${glassClasses[glassLevel]} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`relative ${glassClasses[glassLevel]} ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export function ParallaxCard({ children, className = '', delay = 0, index = 0 }: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Stagger effect based on index
  const yStart = 100 + (index * 20);
  const yEnd = -50 - (index * 10);
  
  const y = useTransform(scrollYProgress, [0, 1], [yStart, yEnd]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxBackgroundProps {
  children?: ReactNode;
  pattern?: 'dots' | 'grid' | 'waves' | 'gradient';
}

export function ParallaxBackgroundLayer({ children, pattern = 'dots' }: ParallaxBackgroundProps) {
  const patterns = {
    dots: {
      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0)`,
      backgroundSize: '32px 32px'
    },
    grid: {
      backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px'
    },
    waves: {
      background: `
        repeating-linear-gradient(
          45deg,
          rgba(0,0,0,0.01) 0px,
          rgba(0,0,0,0.01) 2px,
          transparent 2px,
          transparent 8px
        )
      `
    },
    gradient: {
      background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.03) 0%, transparent 70%)'
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static Pattern */}
      <div 
        className="absolute inset-0 opacity-40"
        style={patterns[pattern]}
      />
      
      {/* Animated Floating Elements */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.02) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Additional Floating Layer */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {children}
    </div>
  );
}

interface ParallaxTextProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxText({ children, className = '', speed = 50 }: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
