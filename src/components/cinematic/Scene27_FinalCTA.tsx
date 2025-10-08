import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/**
 * SCENE 27: FINAL CTA - Neon Night Sky
 * BG: Deep night sky with city lights
 * MG: Animated fireworks particles bursting
 * FG: Neon text "Let's Build Your Brand Together" with glow effects
 */

export function Scene27_FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const fireworkColors = [
    '#FFC60B', // Yellow
    '#4285F4', // Blue
    '#EA4335', // Red
    '#34A853', // Green
    '#9333EA', // Purple
    '#EC4899', // Pink
    '#FF9900', // Orange
    '#06B6D4'  // Cyan
  ];

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* Background - Night Sky */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, opacity }}
      >
        {/* Deep Night Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950" />
        
        {/* City Lights at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/20 via-orange-600/10 to-transparent" />
          
          {/* City Skyline Silhouette */}
          <svg className="absolute bottom-0 w-full h-full opacity-60" viewBox="0 0 1200 120" preserveAspectRatio="none">
            {[...Array(30)].map((_, i) => (
              <rect
                key={i}
                x={i * 40}
                y={60 + Math.random() * 40}
                width={35}
                height={60 - Math.random() * 40}
                fill="#0a0a0a"
              />
            ))}
            
            {/* Windows */}
            {[...Array(100)].map((_, i) => (
              <motion.rect
                key={`window-${i}`}
                x={5 + (i * 12) % 1190}
                y={70 + Math.random() * 40}
                width="2"
                height="3"
                fill="#FFC60B"
                opacity={0.7}
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{
                  duration: 1.5 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </svg>
        </div>

        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
                opacity: Math.random() * 0.8 + 0.2
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Middleground - Fireworks Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        {/* Multiple Firework Bursts */}
        {[...Array(8)].map((_, burstIndex) => {
          const burstX = 20 + (burstIndex * 12) % 80;
          const burstY = 20 + (burstIndex * 15) % 50;
          const burstColor = fireworkColors[burstIndex % fireworkColors.length];
          
          return (
            <div
              key={burstIndex}
              className="absolute"
              style={{ left: `${burstX}%`, top: `${burstY}%` }}
            >
              {/* Particles radiating from center */}
              {[...Array(20)].map((_, particleIndex) => {
                const angle = (particleIndex / 20) * Math.PI * 2;
                const distance = 80;
                
                return (
                  <motion.div
                    key={particleIndex}
                    className="absolute w-2 h-2 rounded-full"
                    style={{ backgroundColor: burstColor }}
                    animate={{
                      x: [0, Math.cos(angle) * distance],
                      y: [0, Math.sin(angle) * distance],
                      opacity: [1, 0],
                      scale: [1, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: burstIndex * 0.3,
                      ease: "easeOut"
                    }}
                  />
                );
              })}
              
              {/* Central Flash */}
              <motion.div
                className="absolute w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{
                  backgroundColor: burstColor,
                  boxShadow: `0 0 40px ${burstColor}`
                }}
                animate={{
                  scale: [0, 2, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: burstIndex * 0.3
                }}
              />
            </div>
          );
        })}

        {/* Falling Sparks */}
        {[...Array(30)].map((_, i) => {
          const sparkColor = fireworkColors[i % fireworkColors.length];
          return (
            <motion.div
              key={`spark-${i}`}
              className="absolute w-1 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '20%',
                backgroundColor: sparkColor,
                boxShadow: `0 0 10px ${sparkColor}`
              }}
              animate={{
                y: [0, window.innerHeight],
                opacity: [1, 0],
                x: [0, (Math.random() - 0.5) * 100]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeIn"
              }}
            />
          );
        })}
      </motion.div>

      {/* Foreground - Neon CTA Text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity }}
      >
        <div className="text-center">
          {/* Main CTA Text with Neon Effect */}
          <motion.h1
            className="font-antonio font-bold mb-6"
            style={{
              fontSize: 'clamp(2rem, 8vw, 5rem)',
              background: 'linear-gradient(135deg, #FFC60B, #FF9900, #FFC60B)',
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px #FFC60B) drop-shadow(0 0 60px #FFC60B)'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Let's Build Your Brand Together
          </motion.h1>

          {/* Subtitle with Multiple Colors */}
          <motion.p
            className="font-raleway text-xl mb-8"
            style={{
              color: '#ffffff',
              textShadow: '0 0 20px rgba(255,255,255,0.5)'
            }}
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          >
            Start Your Digital Transformation Today
          </motion.p>

          {/* Glowing Dots */}
          <div className="flex justify-center gap-4 mb-8">
            {fireworkColors.map((color, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 20px ${color}`
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>

          {/* Pulsing Ring Effect */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                width: '400px',
                height: '400px',
                borderColor: '#FFC60B'
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Continuous Particle Rain */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(40)].map((_, i) => {
          const color = fireworkColors[i % fireworkColors.length];
          return (
            <motion.div
              key={`rain-${i}`}
              className="absolute w-px h-4 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '0',
                background: `linear-gradient(to bottom, ${color}, transparent)`,
                boxShadow: `0 0 4px ${color}`
              }}
              animate={{
                y: [0, window.innerHeight + 20],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "linear"
              }}
            />
          );
        })}
      </div>

      {/* Ambient Glow at Bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse at bottom, rgba(255,198,11,0.2) 0%, transparent 70%)',
            'radial-gradient(ellipse at bottom, rgba(255,198,11,0.3) 0%, transparent 70%)',
            'radial-gradient(ellipse at bottom, rgba(255,198,11,0.2) 0%, transparent 70%)'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity
        }}
      />
    </div>
  );
}
