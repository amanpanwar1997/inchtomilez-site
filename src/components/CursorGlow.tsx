import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'A' || 
                           target.tagName === 'BUTTON' || 
                           target.closest('a') !== null || 
                           target.closest('button') !== null ||
                           target.style.cursor === 'pointer';
      setIsHovering(isInteractive);
    };

    const hideCursor = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', hideCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot - small precise cursor */}
      <motion.div
        className="fixed pointer-events-none z-[100] mix-blend-difference hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div 
          className="w-2 h-2 rounded-full bg-white"
          animate={{
            scale: isClicking ? 0.6 : isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Primary glow ring */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div 
          className="rounded-full"
          animate={{
            width: isClicking ? '20px' : isHovering ? '48px' : '32px',
            height: isClicking ? '20px' : isHovering ? '48px' : '32px',
          }}
          transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
          style={{
            background: isHovering 
              ? 'radial-gradient(circle, rgba(186,255,0,0.4) 0%, rgba(186,255,0,0.1) 50%, transparent 100%)'
              : 'radial-gradient(circle, rgba(186,255,0,0.35) 0%, rgba(186,255,0,0.08) 50%, transparent 100%)',
            filter: 'blur(8px)',
          }}
        />
      </motion.div>

      {/* Secondary trailing glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ delay: 0.03 }}
      >
        <motion.div 
          className="rounded-full"
          animate={{
            width: isClicking ? '32px' : isHovering ? '72px' : '56px',
            height: isClicking ? '32px' : isHovering ? '72px' : '56px',
          }}
          transition={{ duration: 0.25, type: "spring", stiffness: 200 }}
          style={{
            background: 'radial-gradient(circle, rgba(186,255,0,0.15) 0%, rgba(186,255,0,0.05) 40%, transparent 70%)',
            filter: 'blur(16px)',
          }}
        />
      </motion.div>

      {/* Outer ambient glow with yellow accent */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ delay: 0.06 }}
      >
        <motion.div 
          className="rounded-full"
          animate={{
            width: isClicking ? '48px' : isHovering ? '96px' : '80px',
            height: isClicking ? '48px' : isHovering ? '96px' : '80px',
            opacity: isHovering ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 150 }}
          style={{
            background: isHovering
              ? 'radial-gradient(circle, rgba(255,198,11,0.12) 0%, rgba(186,255,0,0.08) 30%, transparent 60%)'
              : 'radial-gradient(circle, rgba(186,255,0,0.08) 0%, rgba(186,255,0,0.03) 30%, transparent 60%)',
            filter: 'blur(24px)',
          }}
        />
      </motion.div>

      {/* Ripple effect on click */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-50 hidden lg:block"
          style={{
            left: cursorX.get(),
            top: cursorY.get(),
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="w-12 h-12 rounded-full border-2 border-[#baff00]"
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </>
  );
}