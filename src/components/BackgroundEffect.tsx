import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function BackgroundEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1920, 
    height: typeof window !== 'undefined' ? window.innerHeight : 1080 
  });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    handleResize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY]);

  // Grid configuration
  const gridSize = 70;
  const cols = Math.ceil(windowSize.width / gridSize) + 2;
  const rows = Math.ceil(windowSize.height / gridSize) + 2;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Subtle Glass Layer */}
      <div className="absolute inset-0 bg-gray-50/20" />
      
      {/* Animated Grid Pattern with SVG */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 1 }}
      >
        <defs>
          {/* Gradient for lines */}
          <linearGradient id="lineGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0)" />
            <stop offset="50%" stopColor="rgba(0, 0, 0, 0.3)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </linearGradient>
          
          <linearGradient id="lineGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0)" />
            <stop offset="50%" stopColor="rgba(0, 0, 0, 0.3)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Vertical Grid Lines */}
        {Array.from({ length: cols }).map((_, i) => {
          const x = i * gridSize;
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - x, 2) + 
            Math.pow(mousePosition.y - windowSize.height / 2, 2)
          );
          const maxDistance = 300;
          const baseOpacity = 0.08;
          const hoverOpacity = isHovering ? Math.max(0, (1 - distance / maxDistance) * 0.5) : 0;
          const finalOpacity = baseOpacity + hoverOpacity;
          
          return (
            <motion.line
              key={`v-${i}`}
              x1={x}
              y1="0"
              x2={x}
              y2={windowSize.height}
              stroke="url(#lineGradientV)"
              strokeWidth="1"
              initial={{ opacity: baseOpacity }}
              animate={{ 
                opacity: finalOpacity,
                strokeWidth: finalOpacity > 0.3 ? 2 : 1,
              }}
              transition={{ 
                opacity: { duration: 0.4 },
                strokeWidth: { duration: 0.3 }
              }}
              style={{ filter: finalOpacity > 0.3 ? 'url(#lineGlow)' : 'none' }}
            />
          );
        })}

        {/* Horizontal Grid Lines */}
        {Array.from({ length: rows }).map((_, i) => {
          const y = i * gridSize;
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - windowSize.width / 2, 2) + 
            Math.pow(mousePosition.y - y, 2)
          );
          const maxDistance = 300;
          const baseOpacity = 0.08;
          const hoverOpacity = isHovering ? Math.max(0, (1 - distance / maxDistance) * 0.5) : 0;
          const finalOpacity = baseOpacity + hoverOpacity;
          
          return (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={y}
              x2={windowSize.width}
              y2={y}
              stroke="url(#lineGradientH)"
              strokeWidth="1"
              initial={{ opacity: baseOpacity }}
              animate={{ 
                opacity: finalOpacity,
                strokeWidth: finalOpacity > 0.3 ? 2 : 1,
              }}
              transition={{ 
                opacity: { duration: 0.4 },
                strokeWidth: { duration: 0.3 }
              }}
              style={{ filter: finalOpacity > 0.3 ? 'url(#lineGlow)' : 'none' }}
            />
          );
        })}

        {/* Diagonal Lines - Top-Left to Bottom-Right */}
        {Array.from({ length: Math.floor((cols + rows) / 2) }).map((_, i) => {
          const spacing = gridSize * 2;
          const offset = i * spacing - rows * spacing / 2;
          
          const x1 = Math.max(-100, offset);
          const y1 = Math.max(-100, -offset);
          const x2 = Math.min(windowSize.width + 100, offset + windowSize.height + 100);
          const y2 = Math.min(windowSize.height + 100, windowSize.height - offset + 100);
          
          // Distance from cursor to line
          const centerX = (x1 + x2) / 2;
          const centerY = (y1 + y2) / 2;
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - centerX, 2) + 
            Math.pow(mousePosition.y - centerY, 2)
          );
          
          const maxDistance = 350;
          const baseOpacity = 0.04;
          const hoverOpacity = isHovering ? Math.max(0, (1 - distance / maxDistance) * 0.4) : 0;
          const finalOpacity = baseOpacity + hoverOpacity;
          
          return (
            <motion.line
              key={`d1-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(0, 0, 0, 0.15)"
              strokeWidth="0.5"
              strokeDasharray="8 8"
              initial={{ opacity: baseOpacity }}
              animate={{ 
                opacity: finalOpacity,
                strokeWidth: finalOpacity > 0.2 ? 1 : 0.5,
                strokeDashoffset: [0, 16]
              }}
              transition={{ 
                opacity: { duration: 0.5 },
                strokeWidth: { duration: 0.3 },
                strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
            />
          );
        })}
      </svg>

      {/* Cursor Spotlight Effect */}
      {isHovering && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: smoothMouseX,
            top: smoothMouseY,
            width: 600,
            height: 600,
            x: '-50%',
            y: '-50%',
            background: 'rgba(0, 0, 0, 0.02)',
            borderRadius: '50%',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Floating Geometric Shapes - Squares, Diamonds, Hexagons */}
      {isHovering && (
        <>
          {/* Rotating Squares */}
          {[60, 100, 140, 180].map((size, i) => (
            <motion.div
              key={`square-${i}`}
              className="absolute pointer-events-none border border-black/20"
              style={{
                left: smoothMouseX,
                top: smoothMouseY,
                width: size,
                height: size,
                x: '-50%',
                y: '-50%',
                borderRadius: i % 2 === 0 ? '0%' : '10%',
              }}
              initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3 - i * 0.05, 0.15, 0.3 - i * 0.05],
                rotate: i % 2 === 0 ? [0, 180, 360] : [360, 180, 0]
              }}
              transition={{
                scale: { duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 15 + i * 3, repeat: Infinity, ease: "linear" }
              }}
            />
          ))}

          {/* Diamond Shapes */}
          {[80, 130, 180].map((size, i) => (
            <motion.div
              key={`diamond-${i}`}
              className="absolute pointer-events-none border border-black/15"
              style={{
                left: smoothMouseX,
                top: smoothMouseY,
                width: size,
                height: size,
                x: '-50%',
                y: '-50%',
                transform: 'rotate(45deg)',
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25 - i * 0.06, 0.12, 0.25 - i * 0.06],
              }}
              transition={{
                scale: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          ))}
        </>
      )}

      {/* Laser Crosshairs */}
      {isHovering && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ opacity: 0.3 }}
        >
          {/* Horizontal Laser Lines */}
          <motion.line
            x1="0"
            y1={mousePosition.y}
            x2={windowSize.width}
            y2={mousePosition.y}
            stroke="rgba(0, 0, 0, 0.2)"
            strokeWidth="1"
            strokeDasharray="10 10"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: [0, 1],
              strokeDashoffset: [0, 20]
            }}
            transition={{
              pathLength: { duration: 1.5, ease: "easeInOut" },
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />
          
          {/* Vertical Laser Lines */}
          <motion.line
            x1={mousePosition.x}
            y1="0"
            x2={mousePosition.x}
            y2={windowSize.height}
            stroke="rgba(0, 0, 0, 0.2)"
            strokeWidth="1"
            strokeDasharray="10 10"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: [0, 1],
              strokeDashoffset: [0, 20]
            }}
            transition={{
              pathLength: { duration: 1.5, ease: "easeInOut" },
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />

          {/* Corner Brackets - Top Left */}
          <motion.path
            d={`M ${mousePosition.x - 80} ${mousePosition.y - 80} L ${mousePosition.x - 120} ${mousePosition.y - 80} L ${mousePosition.x - 120} ${mousePosition.y - 120} L ${mousePosition.x - 80} ${mousePosition.y - 120}`}
            stroke="rgba(0, 0, 0, 0.25)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: [0, 1, 0]
            }}
            transition={{
              pathLength: { duration: 0.8 },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Corner Brackets - Top Right */}
          <motion.path
            d={`M ${mousePosition.x + 80} ${mousePosition.y - 80} L ${mousePosition.x + 120} ${mousePosition.y - 80} L ${mousePosition.x + 120} ${mousePosition.y - 120} L ${mousePosition.x + 80} ${mousePosition.y - 120}`}
            stroke="rgba(0, 0, 0, 0.25)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: [0, 1, 0]
            }}
            transition={{
              pathLength: { duration: 0.8, delay: 0.2 },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
            }}
          />

          {/* Corner Brackets - Bottom Left */}
          <motion.path
            d={`M ${mousePosition.x - 80} ${mousePosition.y + 80} L ${mousePosition.x - 120} ${mousePosition.y + 80} L ${mousePosition.x - 120} ${mousePosition.y + 120} L ${mousePosition.x - 80} ${mousePosition.y + 120}`}
            stroke="rgba(0, 0, 0, 0.25)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: [0, 1, 0]
            }}
            transition={{
              pathLength: { duration: 0.8, delay: 0.4 },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
            }}
          />

          {/* Corner Brackets - Bottom Right */}
          <motion.path
            d={`M ${mousePosition.x + 80} ${mousePosition.y + 80} L ${mousePosition.x + 120} ${mousePosition.y + 80} L ${mousePosition.x + 120} ${mousePosition.y + 120} L ${mousePosition.x + 80} ${mousePosition.y + 120}`}
            stroke="rgba(0, 0, 0, 0.25)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: [0, 1, 0]
            }}
            transition={{
              pathLength: { duration: 0.8, delay: 0.6 },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
            }}
          />

          {/* Scanning Lines - 8 directional */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const length = 200;
            const x2 = mousePosition.x + Math.cos(angle) * length;
            const y2 = mousePosition.y + Math.sin(angle) * length;
            
            return (
              <motion.line
                key={`scan-${i}`}
                x1={mousePosition.x}
                y1={mousePosition.y}
                x2={x2}
                y2={y2}
                stroke="rgba(0, 0, 0, 0.15)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.08
                }}
              />
            );
          })}
        </svg>
      )}




    </div>
  );
}