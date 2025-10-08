import { motion, useScroll, useTransform } from 'motion/react';

export function CinematicBackground() {
  const { scrollYProgress } = useScroll();

  // Parallax layers with EXTREME movement
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -1800]);
  
  // Scene opacities - ALWAYS VISIBLE
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 0.8, 0]);
  const servicesOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.6, 0.7], [0, 1, 1, 0]);
  const finalOpacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* ULTRA DRAMATIC gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            scrollYProgress,
            [0, 0.3, 0.6, 1],
            [
              'radial-gradient(ellipse at 60% 40%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 30%, rgba(255,255,255,0.95) 60%)',
              'radial-gradient(ellipse at 40% 60%, rgba(255,198,11,0.2) 0%, rgba(255,198,11,0.08) 30%, rgba(255,255,255,0.95) 60%)',
              'radial-gradient(ellipse at 70% 50%, rgba(0,0,0,0.18) 0%, rgba(255,198,11,0.1) 30%, rgba(255,255,255,0.95) 60%)',
              'radial-gradient(ellipse at 50% 50%, rgba(255,198,11,0.15) 0%, rgba(0,0,0,0.12) 30%, rgba(255,255,255,0.95) 60%)',
            ]
          ),
        }}
      />

      {/* ===== BACKGROUND LAYER - IMPOSSIBLE TO MISS ===== */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* HERO - City Skyline */}
        <motion.div className="absolute inset-0" style={{ opacity: heroOpacity }}>
          {/* MASSIVE buildings - SUPER VISIBLE */}
          <svg className="absolute bottom-0 left-0 w-full h-[60%]" viewBox="0 0 1920 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="buildingGradMega" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.7)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
              </linearGradient>
            </defs>
            <g opacity="0.6">
              {/* Large varied building silhouette */}
              <rect x="0" y="180" width="180" height="420" fill="url(#buildingGradMega)" />
              <rect x="200" y="130" width="160" height="470" fill="url(#buildingGradMega)" />
              <rect x="380" y="210" width="150" height="390" fill="url(#buildingGradMega)" />
              <rect x="550" y="150" width="170" height="450" fill="url(#buildingGradMega)" />
              <rect x="740" y="170" width="155" height="430" fill="url(#buildingGradMega)" />
              <rect x="915" y="110" width="185" height="490" fill="url(#buildingGradMega)" />
              <rect x="1120" y="200" width="160" height="400" fill="url(#buildingGradMega)" />
              <rect x="1300" y="140" width="175" height="460" fill="url(#buildingGradMega)" />
              <rect x="1495" y="180" width="150" height="420" fill="url(#buildingGradMega)" />
              <rect x="1665" y="160" width="165" height="440" fill="url(#buildingGradMega)" />
            </g>
          </svg>

          {/* ULTRA BRIGHT window lights - MASSIVE GLOW */}
          {[...Array(70)].map((_, i) => (
            <motion.div
              key={`window-${i}`}
              className="absolute"
              style={{
                left: `${(i * 2.8 + 1.5) % 96}%`,
                bottom: `${22 + (i * 1.8) % 30}%`,
                width: i % 3 === 0 ? '14px' : '10px',
                height: i % 3 === 0 ? '16px' : '12px',
                background: i % 4 === 0 
                  ? 'rgba(255, 198, 11, 0.95)' 
                  : 'rgba(255, 255, 255, 0.85)',
                borderRadius: '2px',
                boxShadow: i % 4 === 0
                  ? '0 0 30px rgba(255, 198, 11, 0.8), 0 0 60px rgba(255, 198, 11, 0.5)'
                  : '0 0 25px rgba(255, 255, 255, 0.7)',
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.2 + (i % 2),
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          ))}

          {/* GIANT glowing orbs */}
          <motion.div
            className="absolute top-[8%] left-[3%] w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.08) 40%, transparent 65%)',
              filter: 'blur(100px)',
            }}
            animate={{
              x: [0, 180, 0],
              y: [0, 120, 0],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="absolute top-[35%] right-[5%] w-[700px] h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,198,11,0.18) 0%, rgba(255,198,11,0.06) 40%, transparent 65%)',
              filter: 'blur(100px)',
            }}
            animate={{
              x: [0, -140, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </motion.div>

        {/* SERVICES - Holographic Grid */}
        <motion.div className="absolute inset-0" style={{ opacity: servicesOpacity }}>
          {/* SUPER BOLD grid */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }} viewBox="0 0 1920 1080">
            <defs>
              <pattern id="mega-grid" width="70" height="70" patternUnits="userSpaceOnUse">
                <path d="M 70 0 L 0 0 0 70" fill="none" stroke="currentColor" strokeWidth="4" className="text-black" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mega-grid)" />
            {/* BRIGHT diagonal lines */}
            <line x1="0" y1="0" x2="1920" y2="1080" stroke="rgba(255,198,11,0.4)" strokeWidth="6" />
            <line x1="1920" y1="0" x2="0" y2="1080" stroke="rgba(0,0,0,0.25)" strokeWidth="6" />
          </svg>

          {/* MASSIVE floating panels */}
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={`panel-mega-${i}`}
              className="absolute rounded-3xl"
              style={{
                left: `${4 + (i % 6) * 16}%`,
                top: `${10 + Math.floor(i / 6) * 30}%`,
                width: '220px',
                height: '150px',
                background: i % 3 === 0
                  ? 'linear-gradient(135deg, rgba(255,198,11,0.35), rgba(255,198,11,0.15))'
                  : 'rgba(255,255,255,0.6)',
                border: '4px solid rgba(0,0,0,0.2)',
                backdropFilter: 'blur(50px)',
                boxShadow: i % 3 === 0
                  ? '0 0 50px rgba(255,198,11,0.4), 0 15px 40px rgba(0,0,0,0.15)'
                  : '0 15px 50px rgba(0,0,0,0.18)',
              }}
              animate={{
                y: [0, -50, 0],
                rotateY: [0, 25, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 12 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
          ))}
        </motion.div>

        {/* FINAL - Giant Globe */}
        <motion.div className="absolute inset-0" style={{ opacity: finalOpacity }}>
          {/* GIGANTIC rotating globe */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 50%, transparent 75%)',
              border: '5px solid rgba(0,0,0,0.25)',
              borderRadius: '50%',
            }}
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Grid lines */}
            {[...Array(11)].map((_, i) => (
              <div
                key={`lat-${i}`}
                className="absolute left-0 right-0 border-t-2 border-black/15"
                style={{ top: `${6 + i * 9}%` }}
              />
            ))}
            {/* MEGA BRIGHT location pins */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`pin-mega-${i}`}
                className="absolute w-6 h-6 rounded-full"
                style={{
                  left: `${15 + (i * 6) % 70}%`,
                  top: `${20 + (i * 5) % 60}%`,
                  background: i % 3 === 0
                    ? 'rgba(255,198,11,1)'
                    : 'rgba(0,0,0,0.6)',
                  boxShadow: i % 3 === 0
                    ? '0 0 40px rgba(255,198,11,1), 0 0 80px rgba(255,198,11,0.6)'
                    : '0 0 20px rgba(0,0,0,0.5)',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2.8 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ===== MIDGROUND LAYER ===== */}
      <motion.div
        className="absolute inset-0"
        style={{ y: midgroundY }}
      >
        {/* HERO - Mid buildings */}
        <motion.div className="absolute inset-0" style={{ opacity: heroOpacity }}>
          <svg className="absolute bottom-0 left-0 w-full h-[70%]" viewBox="0 0 1920 750" preserveAspectRatio="none">
            <defs>
              <linearGradient id="buildingGrad2Mega" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.75)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
              </linearGradient>
            </defs>
            <g opacity="0.7">
              <rect x="10" y="270" width="220" height="480" fill="url(#buildingGrad2Mega)" rx="15" />
              <rect x="250" y="220" width="190" height="530" fill="url(#buildingGrad2Mega)" rx="15" />
              <rect x="460" y="300" width="180" height="450" fill="url(#buildingGrad2Mega)" rx="15" />
              <rect x="660" y="240" width="200" height="510" fill="url(#buildingGrad2Mega)" rx="15" />
              <rect x="880" y="260" width="185" height="490" fill="url(#buildingGrad2Mega)" rx="15" />
              <rect x="1085" y="210" width="205" height="540" fill="url(#buildingGrad2Mega)" rx="15" />
              <rect x="1310" y="290" width="190" height="460" fill="url(#buildingGrad2Mega)" rx="15" />
              <rect x="1520" y="230" width="195" height="520" fill="url(#buildingGrad2Mega)" rx="15" />
              <rect x="1735" y="270" width="175" height="480" fill="url(#buildingGrad2Mega)" rx="15" />
            </g>
          </svg>

          {/* ULTRA BRIGHT billboards */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`billboard-mega-${i}`}
              className="absolute rounded-3xl"
              style={{
                left: `${5 + i * 8.5}%`,
                bottom: `${35 + (i % 2) * 16}%`,
                width: '180px',
                height: '110px',
                background: i % 3 === 0 
                  ? 'linear-gradient(135deg, rgba(255,198,11,0.5), rgba(255,198,11,0.25))'
                  : 'rgba(255,255,255,0.55)',
                border: '4px solid rgba(0,0,0,0.2)',
                backdropFilter: 'blur(30px)',
                boxShadow: i % 3 === 0
                  ? '0 0 60px rgba(255,198,11,0.6), 0 10px 35px rgba(0,0,0,0.2)'
                  : '0 10px 40px rgba(0,0,0,0.18)',
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* ===== FOREGROUND LAYER - ULTRA VISIBLE ===== */}
      <motion.div
        className="absolute inset-0"
        style={{ y: foregroundY }}
      >
        {/* HERO - Near buildings with EXTREME NEON */}
        <motion.div className="absolute inset-0" style={{ opacity: heroOpacity }}>
          <svg className="absolute bottom-0 left-0 w-full h-[80%]" viewBox="0 0 1920 900" preserveAspectRatio="none">
            <defs>
              <linearGradient id="buildingGrad3Mega" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.8)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
              </linearGradient>
            </defs>
            <g opacity="0.75">
              <rect x="-40" y="360" width="260" height="540" fill="url(#buildingGrad3Mega)" rx="18" />
              <rect x="240" y="310" width="240" height="590" fill="url(#buildingGrad3Mega)" rx="18" />
              <rect x="500" y="390" width="220" height="510" fill="url(#buildingGrad3Mega)" rx="18" />
              <rect x="740" y="330" width="250" height="570" fill="url(#buildingGrad3Mega)" rx="18" />
              <rect x="1010" y="370" width="230" height="530" fill="url(#buildingGrad3Mega)" rx="18" />
              <rect x="1260" y="300" width="255" height="600" fill="url(#buildingGrad3Mega)" rx="18" />
              <rect x="1535" y="380" width="235" height="520" fill="url(#buildingGrad3Mega)" rx="18" />
              <rect x="1790" y="340" width="245" height="560" fill="url(#buildingGrad3Mega)" rx="18" />
            </g>
          </svg>

          {/* EXTREME NEON SIGNS - IMPOSSIBLE TO MISS */}
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={`neon-extreme-${i}`}
              className="absolute rounded-3xl"
              style={{
                left: `${8 + i * 14.5}%`,
                bottom: `${50 + (i % 2) * 20}%`,
                width: '200px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(255,198,11,0.6), rgba(255,198,11,0.4))',
                border: '5px solid rgba(255,198,11,0.9)',
                boxShadow: '0 0 80px rgba(255,198,11,0.8), 0 0 120px rgba(255,198,11,0.5), inset 0 0 40px rgba(255,198,11,0.4)',
                backdropFilter: 'blur(25px)',
              }}
              animate={{
                opacity: [0.8, 1, 0.8],
                boxShadow: [
                  '0 0 80px rgba(255,198,11,0.8), 0 0 120px rgba(255,198,11,0.5)',
                  '0 0 100px rgba(255,198,11,1), 0 0 150px rgba(255,198,11,0.7)',
                  '0 0 80px rgba(255,198,11,0.8), 0 0 120px rgba(255,198,11,0.5)',
                ],
              }}
              transition={{
                duration: 3 + i * 0.25,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* GIANT floating particles - EXTREMELY VISIBLE */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`particle-extreme-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${(i * 1.8 + 0.5) % 99}%`,
              top: `${(i * 2.5 + 3) % 94}%`,
              width: i % 2 === 0 ? '20px' : '14px',
              height: i % 2 === 0 ? '20px' : '14px',
              background: i % 5 === 0 
                ? 'rgba(255, 198, 11, 0.9)' 
                : 'rgba(0,0,0,0.5)',
              boxShadow: i % 5 === 0
                ? '0 0 40px rgba(255,198,11,0.8)'
                : '0 0 20px rgba(0,0,0,0.4)',
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.6, 1],
            }}
            transition={{
              duration: 15 + i * 0.25,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* GIANT paper plane */}
        <motion.div
          className="absolute"
          style={{
            left: '-10%',
            top: '10%',
            opacity: finalOpacity,
          }}
        >
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            animate={{
              x: [0, 2200],
              y: [0, -350, 100, -180, 0],
              rotate: [0, 30, -25, 20, 0],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M 15 60 L 105 15 L 75 105 L 60 66 L 15 60 Z"
              fill="rgba(255,198,11,0.8)"
              stroke="rgba(255,198,11,1)"
              strokeWidth="4"
            />
            <path
              d="M 60 66 L 75 105"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="3"
            />
          </motion.svg>
        </motion.div>

        {/* GIANT balloons */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`balloon-extreme-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 9}%`,
              bottom: '0%',
              opacity: servicesOpacity,
            }}
          >
            <motion.svg
              width="75"
              height="110"
              viewBox="0 0 75 110"
              animate={{
                y: [0, -600, -1200],
                x: [0, (i % 2 === 0 ? 70 : -70), 0],
                opacity: [1, 1, 0],
                rotate: [0, (i % 2 === 0 ? 25 : -25), 0],
              }}
              transition={{
                duration: 25 + i * 2.5,
                repeat: Infinity,
                delay: i * 3,
                ease: "easeInOut",
              }}
            >
              <ellipse
                cx="37.5"
                cy="32"
                rx="30"
                ry="38"
                fill={i % 3 === 0 ? 'rgba(255,198,11,0.8)' : 'rgba(0,0,0,0.4)'}
                stroke={i % 3 === 0 ? 'rgba(255,198,11,1)' : 'rgba(0,0,0,0.6)'}
                strokeWidth="4"
              />
              <line
                x1="37.5"
                y1="70"
                x2="37.5"
                y2="110"
                stroke="rgba(0,0,0,0.6)"
                strokeWidth="3"
              />
              <circle
                cx="37.5"
                cy="32"
                r="15"
                fill="rgba(255,255,255,0.6)"
              />
            </motion.svg>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== AMBIENT EFFECTS - SUPER VISIBLE ===== */}
      
      {/* MASSIVE dust particles */}
      <div className="absolute inset-0">
        {[...Array(120)].map((_, i) => (
          <motion.div
            key={`dust-extreme-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: i % 3 === 0 ? '8px' : '5px',
              height: i % 3 === 0 ? '8px' : '5px',
              background: i % 6 === 0 ? 'rgba(255,198,11,0.5)' : 'rgba(0,0,0,0.25)',
            }}
            animate={{
              y: [0, -1600],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 35 + Math.random() * 25,
              repeat: Infinity,
              delay: Math.random() * 12,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ULTRA BRIGHT light rays */}
      <motion.div
        className="absolute top-0 left-1/4 w-4 h-full"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(255,198,11,0.8), transparent)',
          opacity: 0.2,
        }}
        animate={{
          x: [0, 960, 1920],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-0 right-1/3 w-4 h-full"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6), transparent)',
          opacity: 0.15,
        }}
        animate={{
          x: [0, -960, -1920],
          opacity: [0, 0.9, 0],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
          delay: 10,
        }}
      />

      {/* Deep vignette for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 15%, rgba(0,0,0,0.08) 100%)',
        }}
      />
    </div>
  );
}