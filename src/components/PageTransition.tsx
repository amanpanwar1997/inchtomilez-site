import { motion, AnimatePresence } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

export function PageTransition({ children, pageKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Loading transition component
export function LoadingTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      style={{ pointerEvents: 'none' }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated loader */}
        <div className="loader-dots mb-4">
          <div className="loader-dot" />
          <div className="loader-dot" />
          <div className="loader-dot" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full bg-[#baff00]/20 blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

// Slide transition with wipe effect
export function SlideTransition({ children, direction = 'left' }: { 
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
}) {
  const variants = {
    left: { x: '-100%' },
    right: { x: '100%' },
    up: { y: '-100%' },
    down: { y: '100%' },
  };

  return (
    <motion.div
      initial={variants[direction]}
      animate={{ x: 0, y: 0 }}
      exit={variants[direction]}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}