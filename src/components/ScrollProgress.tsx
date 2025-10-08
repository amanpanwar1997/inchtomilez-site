import { useScroll, motion } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-50 will-change-transform"
      style={{ 
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #ffc60b 0%, #baff00 100%)'
      }}
    />
  );
}