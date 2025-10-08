import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/**
 * SCENE 1: HERO - Futuristic Skyline
 * BG: Futuristic cityscape with skyscrapers
 * MG: Floating clouds, buildings with parallax
 * FG: Neon glow effects, particles
 */

export function Scene01_Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const mgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        style={{ y: bgY, opacity, scale }}
      >
        {/* Background - Futuristic Skyline */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900" />
        
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Futuristic Buildings Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-64">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#1e1b4b', stopOpacity: 0.9 }} />
                <stop offset="100%" style={{ stopColor: '#0c0a1f', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            
            {/* Building Shapes */}
            <rect x="50" y="100" width="80" height="200" fill="url(#buildingGradient)" opacity="0.8" />
            <rect x="150" y="80" width="60" height="220" fill="url(#buildingGradient)" opacity="0.7" />
            <rect x="230" y="120" width="70" height="180" fill="url(#buildingGradient)" opacity="0.8" />
            <rect x="320" y="60" width="90" height="240" fill="url(#buildingGradient)" opacity="0.9" />
            <rect x="430" y="90" width="75" height="210" fill="url(#buildingGradient)" opacity="0.8" />
            <rect x="525" y="50" width="100" height="250" fill="url(#buildingGradient)" opacity="1" />
            <rect x="645" y="110" width="65" height="190" fill="url(#buildingGradient)" opacity="0.7" />
            <rect x="730" y="70" width="85" height="230" fill="url(#buildingGradient)" opacity="0.9" />
            <rect x="835" y="100" width="70" height="200" fill="url(#buildingGradient)" opacity="0.8" />
            <rect x="925" y="130" width="60" height="170" fill="url(#buildingGradient)" opacity="0.7" />
            <rect x="1005" y="80" width="75" height="220" fill="url(#buildingGradient)" opacity="0.8" />
            <rect x="1100" y="110" width="80" height="190" fill="url(#buildingGradient)" opacity="0.8" />
            
            {/* Building Windows - Glowing */}
            {[...Array(30)].map((_, i) => (
              <motion.rect
                key={i}
                x={50 + (i * 40) % 1150}
                y={100 + Math.random() * 150}
                width="3"
                height="4"
                fill="#FFC60B"
                opacity={0.6}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() }}
              />
            ))}
          </svg>
        </div>
      </motion.div>

      {/* Middleground - Floating Clouds */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: mgY, opacity }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${i * 20}%`,
              top: `${20 + i * 10}%`,
              width: '200px',
              height: '60px'
            }}
            animate={{
              x: [-50, 50, -50],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-xl" />
          </motion.div>
        ))}
      </motion.div>

      {/* Foreground - Neon Glow Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: fgY, opacity }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#FFC60B' : i % 3 === 1 ? '#4285F4' : '#EC4899'
            }}
            animate={{
              y: [-100, window.innerHeight + 100],
              opacity: [0, 1, 1, 0],
              scale: [0, 1.5, 1.5, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Neon Grid Floor */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-cyan-500/5 to-transparent" />
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          {[...Array(20)].map((_, i) => (
            <line
              key={i}
              x1={i * 60}
              y1="0"
              x2={600}
              y2="100"
              stroke="#06B6D4"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
