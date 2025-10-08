import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function ConfettiEffect({ trigger, onComplete }: ConfettiEffectProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#9333EA', '#EC4899', '#14B8A6'];

  useEffect(() => {
    if (trigger) {
      // Generate confetti pieces
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5
      }));

      setPieces(newPieces);

      // Clear after animation
      setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, 3000);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              backgroundColor: piece.color,
              left: piece.x,
              top: piece.y
            }}
            initial={{
              y: -20,
              rotate: 0,
              scale: piece.scale,
              opacity: 1
            }}
            animate={{
              y: window.innerHeight + 20,
              rotate: piece.rotation + 720,
              x: piece.x + (Math.random() - 0.5) * 200,
              opacity: [1, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3,
              ease: 'easeOut'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
