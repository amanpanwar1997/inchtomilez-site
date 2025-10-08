import { motion, useScroll, useTransform } from 'motion/react';

export function ParallaxLines() {
  const { scrollYProgress } = useScroll();
  
  // Multi-speed parallax layers for depth
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  
  // Opacity fades for reveal
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.2, 1, 1, 0.2]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.015) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Layer 1 - Fastest Moving - Diagonal Lines */}
      <motion.div 
        className="absolute inset-0 will-change-transform"
        style={{ y: y1, opacity: opacity1 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`diag1-${i}`}
            className="absolute h-[200%] w-px bg-gradient-to-b from-transparent via-black/[0.04] to-transparent"
            style={{
              left: `${i * 8.33}%`,
              top: '-50%',
              transform: `rotate(${15}deg)`,
              transformOrigin: 'top left'
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.05, ease: "easeOut" }}
          />
        ))}
      </motion.div>

      {/* Layer 2 - Medium Speed - Vertical Lines */}
      <motion.div 
        className="absolute inset-0 will-change-transform"
        style={{ y: y2, opacity: opacity2 }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`vert-${i}`}
            className="absolute h-[150%] w-px bg-gradient-to-b from-transparent via-black/[0.05] to-transparent"
            style={{
              left: `${(i + 1) * 10}%`,
              top: '-25%'
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
          />
        ))}
      </motion.div>

      {/* Layer 3 - Slow Speed - Horizontal Lines */}
      <motion.div 
        className="absolute inset-0 will-change-transform"
        style={{ y: y3, opacity: opacity3 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`horiz-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-black/[0.04] to-transparent"
            style={{
              top: `${(i + 1) * 12.5}%`
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
          />
        ))}
      </motion.div>

      {/* Layer 4 - Slowest - Accent Dots (Yellow & Green Mix) */}
      <motion.div 
        className="absolute inset-0 will-change-transform"
        style={{ y: y4 }}
      >
        {[...Array(20)].map((_, i) => {
          const x = (i * 13.7) % 100;
          const y = ((i * 17.3) % 80) + 10;
          const isYellow = i % 3 === 0;
          
          return (
            <motion.div
              key={`dot-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background: isYellow ? 'rgba(255, 198, 11, 0.12)' : 'rgba(0, 0, 0, 0.08)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 1],
                opacity: [0, 0.8, 0.8]
              }}
              transition={{ 
                duration: 0.8,
                delay: i * 0.05,
                ease: "easeOut"
              }}
            />
          );
        })}
      </motion.div>

      {/* Animated Accent Lines - Yellow & Green Highlights */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: opacity1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`accent-${i}`}
            className="absolute h-px"
            style={{
              top: `${25 + i * 25}%`,
              left: '0%',
              width: '100%',
              background: i % 2 === 0 
                ? 'linear-gradient(90deg, transparent, rgba(255, 198, 11, 0.15), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(186, 255, 0, 0.15), transparent)',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            transition={{ 
              duration: 3,
              delay: i * 1.5,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Floating Circles */}
      <motion.div className="absolute inset-0">
        {[...Array(6)].map((_, i) => {
          const size = 80 + (i * 30);
          const x = 15 + (i * 15);
          const y = 10 + ((i % 3) * 30);
          
          return (
            <motion.div
              key={`circle-${i}`}
              className="absolute border border-black/[0.04] rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 1],
                opacity: [0, 0.6, 0.6],
                rotate: [0, 360]
              }}
              transition={{ 
                scale: { duration: 1.5, delay: i * 0.2, ease: "easeOut" },
                opacity: { duration: 1.5, delay: i * 0.2 },
                rotate: { duration: 40 + i * 10, repeat: Infinity, ease: "linear" }
              }}
            />
          );
        })}
      </motion.div>

      {/* Minimal Animated Shapes */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y2 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute w-16 h-16 sm:w-20 sm:h-20 border border-black/[0.06] rounded-lg"
            style={{
              left: `${20 + i * 20}%`,
              top: `${15 + (i % 2) * 40}%`,
            }}
            initial={{ rotate: 0, scale: 0 }}
            animate={{ 
              rotate: [0, 180, 0],
              scale: [0, 1, 1]
            }}
            transition={{ 
              rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, delay: i * 0.2 }
            }}
          />
        ))}
      </motion.div>

      {/* Story Flow - Connecting Elements */}
      <motion.svg 
        className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
        style={{ y: y3 }}
      >
        <motion.path
          d="M 10% 20% Q 30% 35% 50% 30% T 90% 40%"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-black"
          strokeDasharray="10 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: 0.8,
            strokeDashoffset: [0, -20]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 1 },
            strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
        />
        <motion.path
          d="M 10% 60% Q 30% 75% 50% 70% T 90% 80%"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-black"
          strokeDasharray="10 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: 0.8,
            strokeDashoffset: [0, -20]
          }}
          transition={{
            pathLength: { duration: 2, delay: 0.5, ease: "easeInOut" },
            opacity: { duration: 1, delay: 0.5 },
            strokeDashoffset: { duration: 3, delay: 0.5, repeat: Infinity, ease: "linear" }
          }}
        />
      </motion.svg>
    </div>
  );
}
