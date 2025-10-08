import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';

interface PageTransitionCurtainProps {
  children: ReactNode;
  pageKey: string;
}

export function PageTransitionCurtain({ children, pageKey }: PageTransitionCurtainProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pageKey} className="relative">
        {/* Curtain Effect - Top */}
        <motion.div
          className="fixed inset-x-0 top-0 h-1/2 bg-black z-[9998]"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          exit={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        />

        {/* Curtain Effect - Bottom */}
        <motion.div
          className="fixed inset-x-0 bottom-0 h-1/2 bg-black z-[9998]"
          initial={{ y: 0 }}
          animate={{ y: '100%' }}
          exit={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        />

        {/* Loading Logo/Text */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            className="heading-xl text-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            InchToMilez
          </motion.h2>
        </motion.div>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
