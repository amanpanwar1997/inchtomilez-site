import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0.5 = slower, 1.5 = faster
  direction?: 'up' | 'down';
  scale?: boolean;
  opacity?: boolean;
}

export function ParallaxSection({ 
  children, 
  className = '', 
  speed = 1,
  direction = 'up',
  scale = false,
  opacity = false
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate parallax movement
  const multiplier = direction === 'up' ? -1 : 1;
  const movement = 100 * speed * multiplier;
  
  const y = useTransform(scrollYProgress, [0, 1], [movement, -movement]);
  const scaleValue = scale ? useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]) : 1;
  const opacityValue = opacity ? useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]) : 1;

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          y,
          scale: scaleValue,
          opacity: opacityValue
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Parallax Image Component
export function ParallaxImage({ 
  src, 
  alt, 
  className = '',
  speed = 0.5 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{ y }}
        className="h-full w-full"
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>
    </div>
  );
}

// Parallax Text Component
export function ParallaxText({ 
  children, 
  className = '',
  speed = 0.3,
  direction = 'up' 
}: { 
  children: ReactNode; 
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const multiplier = direction === 'up' ? -1 : direction === 'down' ? 1 : 0;
  const movement = 80 * speed * multiplier;
  
  const y = direction === 'up' || direction === 'down' 
    ? useTransform(scrollYProgress, [0, 1], [movement, -movement])
    : 0;
    
  const x = direction === 'left' || direction === 'right'
    ? useTransform(scrollYProgress, [0, 1], [movement * (direction === 'left' ? -1 : 1), -movement * (direction === 'left' ? -1 : 1)])
    : 0;

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y, x }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Parallax Card Component with Glassmorphism
export function ParallaxCard({ 
  children, 
  className = '',
  speed = 0.4,
  tilt = false 
}: { 
  children: ReactNode; 
  className?: string;
  speed?: number;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [60 * speed, -60 * speed]);
  const rotateX = tilt ? useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]) : 0;

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y, rotateX }}
        className="glass-shine hover-lift-award transition-all duration-500"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Staggered Parallax Children
export function ParallaxStagger({ 
  children, 
  className = '',
  stagger = 0.1 
}: { 
  children: ReactNode[]; 
  className?: string;
  stagger?: number;
}) {
  return (
    <div className={className}>
      {Array.isArray(children) && children.map((child, index) => (
        <ParallaxSection 
          key={index} 
          speed={1 + (index * stagger)}
        >
          {child}
        </ParallaxSection>
      ))}
    </div>
  );
}
