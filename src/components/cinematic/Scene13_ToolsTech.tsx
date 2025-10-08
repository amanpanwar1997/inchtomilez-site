import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/**
 * SCENE 13: TOOLS & TECHNOLOGIES - Space/Orbital
 * BG: Deep space with stars and nebula
 * MG: Orbiting technology logos like planets
 * FG: Hover interactions, connection lines
 */

export function Scene13_ToolsTech() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  // Technology logos with colors
  const techLogos = [
    { name: 'React', color: '#61DAFB', size: 60, orbit: 200 },
    { name: 'Node', color: '#339933', size: 50, orbit: 250 },
    { name: 'AWS', color: '#FF9900', size: 55, orbit: 180 },
    { name: 'Google', color: '#4285F4', size: 50, orbit: 220 },
    { name: 'Azure', color: '#0078D4', size: 45, orbit: 280 },
    { name: 'Docker', color: '#2496ED', size: 48, orbit: 240 },
    { name: 'K8s', color: '#326CE5', size: 42, orbit: 300 },
    { name: 'Python', color: '#3776AB', size: 50, orbit: 190 },
    { name: 'MongoDB', color: '#47A248', size: 46, orbit: 260 },
    { name: 'Redis', color: '#DC382D', size: 44, orbit: 210 },
    { name: 'Next.js', color: '#000000', size: 48, orbit: 270 },
    { name: 'GraphQL', color: '#E10098', size: 45, orbit: 230 }
  ];

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* Background - Deep Space */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, opacity }}
      >
        {/* Space Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950" />
        
        {/* Nebula Effect */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-600/20 via-pink-600/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-600/20 via-cyan-600/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random()
              }}
              animate={{
                opacity: [Math.random() * 0.5 + 0.3, 1, Math.random() * 0.5 + 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Distant Stars (smaller) */}
        <div className="absolute inset-0 opacity-60">
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Middleground & Foreground - Orbiting Tech Logos */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity }}
      >
        {/* Central Sun */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 60px rgba(255,198,11,0.6)',
              '0 0 100px rgba(255,198,11,0.8)',
              '0 0 60px rgba(255,198,11,0.6)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-2xl">
            <div className="text-white font-antonio font-bold text-2xl">TECH</div>
          </div>
          
          {/* Sun Glow Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-yellow-400/30"
              style={{
                width: `${140 + i * 20}px`,
                height: `${140 + i * 20}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6
              }}
            />
          ))}
        </motion.div>

        {/* Orbiting Technology Planets */}
        {techLogos.map((tech, i) => {
          const angle = (i / techLogos.length) * Math.PI * 2;
          const orbitDuration = 30 + (tech.orbit / 10);
          
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%'
              }}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: orbitDuration,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div
                className="absolute"
                style={{
                  x: Math.cos(angle) * tech.orbit,
                  y: Math.sin(angle) * tech.orbit
                }}
                whileHover={{ scale: 1.3, zIndex: 50 }}
              >
                {/* Planet/Logo */}
                <motion.div
                  className="rounded-full flex items-center justify-center text-white font-bold shadow-2xl cursor-pointer"
                  style={{
                    width: `${tech.size}px`,
                    height: `${tech.size}px`,
                    backgroundColor: tech.color,
                    border: `2px solid ${tech.color}40`
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${tech.color}60`,
                      `0 0 40px ${tech.color}80`,
                      `0 0 20px ${tech.color}60`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{
                    boxShadow: `0 0 60px ${tech.color}`,
                  }}
                >
                  <span style={{ fontSize: `${tech.size / 4}px` }}>{tech.name}</span>
                </motion.div>

                {/* Orbit Trail */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed opacity-20"
                  style={{
                    width: `${tech.orbit * 2}px`,
                    height: `${tech.orbit * 2}px`,
                    borderColor: tech.color
                  }}
                />

                {/* Rotating Rings Around Planet */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-30"
                  style={{
                    width: `${tech.size * 1.4}px`,
                    height: `${tech.size * 0.6}px`,
                    borderColor: tech.color,
                    transformOrigin: 'center'
                  }}
                  animate={{ rotateX: 75 }}
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Connection Lines Between Technologies */}
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="800" height="800" style={{ pointerEvents: 'none' }}>
          {techLogos.map((tech, i) => {
            const nextTech = techLogos[(i + 1) % techLogos.length];
            const angle1 = (i / techLogos.length) * Math.PI * 2;
            const angle2 = ((i + 1) / techLogos.length) * Math.PI * 2;
            
            return (
              <motion.line
                key={i}
                x1={400 + Math.cos(angle1) * tech.orbit}
                y1={400 + Math.sin(angle1) * tech.orbit}
                x2={400 + Math.cos(angle2) * nextTech.orbit}
                y2={400 + Math.sin(angle2) * nextTech.orbit}
                stroke={tech.color}
                strokeWidth="1"
                opacity="0.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.1
                }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Shooting Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`
            }}
            animate={{
              x: [0, 400],
              y: [0, 200],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeOut"
            }}
          >
            <div className="w-20 h-px bg-gradient-to-r from-white to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Cosmic Dust */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-purple-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  );
}
