import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

interface Scene {
  id: number;
  name: string;
  scrollRange: [number, number];
  elements: {
    background: React.ReactNode;
    middleground: React.ReactNode;
    foreground: React.ReactNode;
  };
}

export function SceneBasedCinematicBackground() {
  const { scrollYProgress } = useScroll();
  const [activeScene, setActiveScene] = useState(1);

  // Smooth spring physics for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate which scene is active based on scroll
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const sceneNumber = Math.floor(latest * 28) + 1;
      setActiveScene(Math.min(28, Math.max(1, sceneNumber)));
    });
  }, [scrollYProgress]);

  // Define scroll ranges for each scene (0-1 normalized)
  const scenes: Scene[] = [
    {
      id: 1,
      name: 'Hero',
      scrollRange: [0, 0.036],
      elements: {
        background: <HeroBackground progress={smoothProgress} />,
        middleground: <HeroMiddleground progress={smoothProgress} />,
        foreground: <HeroForeground progress={smoothProgress} />
      }
    },
    {
      id: 2,
      name: 'About',
      scrollRange: [0.036, 0.071],
      elements: {
        background: <AboutBackground progress={smoothProgress} />,
        middleground: <AboutMiddleground progress={smoothProgress} />,
        foreground: <AboutForeground progress={smoothProgress} />
      }
    },
    {
      id: 3,
      name: 'Why Choose Us',
      scrollRange: [0.071, 0.107],
      elements: {
        background: <WhyChooseBackground progress={smoothProgress} />,
        middleground: <WhyChooseMiddleground progress={smoothProgress} />,
        foreground: <WhyChooseForeground progress={smoothProgress} />
      }
    },
    {
      id: 4,
      name: 'Core Services',
      scrollRange: [0.107, 0.143],
      elements: {
        background: <CoreServicesBackground progress={smoothProgress} />,
        middleground: <CoreServicesMiddleground progress={smoothProgress} />,
        foreground: <CoreServicesForeground progress={smoothProgress} />
      }
    },
    {
      id: 5,
      name: 'Digital Marketing',
      scrollRange: [0.143, 0.179],
      elements: {
        background: <DigitalMarketingBackground progress={smoothProgress} />,
        middleground: <DigitalMarketingMiddleground progress={smoothProgress} />,
        foreground: <DigitalMarketingForeground progress={smoothProgress} />
      }
    },
    // Add remaining scenes 6-28 here...
  ];

  // Global parallax layers
  const bgY = useTransform(smoothProgress, [0, 1], [0, -800]);
  const mgY = useTransform(smoothProgress, [0, 1], [0, -1600]);
  const fgY = useTransform(smoothProgress, [0, 1], [0, -2400]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dynamic gradient based on active scene */}
      <SceneGradient sceneId={activeScene} progress={smoothProgress} />

      {/* Background Layer */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        {scenes.map((scene) => (
          <SceneLayer
            key={`bg-${scene.id}`}
            scene={scene}
            progress={scrollYProgress}
            layer="background"
          >
            {scene.elements.background}
          </SceneLayer>
        ))}
      </motion.div>

      {/* Middleground Layer */}
      <motion.div
        className="absolute inset-0"
        style={{ y: mgY }}
      >
        {scenes.map((scene) => (
          <SceneLayer
            key={`mg-${scene.id}`}
            scene={scene}
            progress={scrollYProgress}
            layer="middleground"
          >
            {scene.elements.middleground}
          </SceneLayer>
        ))}
      </motion.div>

      {/* Foreground Layer */}
      <motion.div
        className="absolute inset-0"
        style={{ y: fgY }}
      >
        {scenes.map((scene) => (
          <SceneLayer
            key={`fg-${scene.id}`}
            scene={scene}
            progress={scrollYProgress}
            layer="foreground"
          >
            {scene.elements.foreground}
          </SceneLayer>
        ))}
      </motion.div>

      {/* Ambient effects */}
      <AmbientParticles progress={smoothProgress} />
      <LightRays progress={smoothProgress} />
      <Vignette />
    </div>
  );
}

// Scene Layer Component with opacity control
function SceneLayer({ scene, progress, layer, children }: {
  scene: Scene;
  progress: any;
  layer: string;
  children: React.ReactNode;
}) {
  const [start, end] = scene.scrollRange;
  const fadeIn = start - 0.02;
  const fadeOut = end + 0.02;

  const opacity = useTransform(
    progress,
    [fadeIn, start, end, fadeOut],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity }}
    >
      {children}
    </motion.div>
  );
}

// ===== SCENE 1: HERO =====
function HeroBackground({ progress }: any) {
  return (
    <svg className="absolute bottom-0 w-full h-[60%]" viewBox="0 0 1920 600" preserveAspectRatio="none">
      <defs>
        <linearGradient id="heroBuilding" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.7)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </linearGradient>
      </defs>
      <g opacity="0.6">
        {/* Futuristic skyline silhouettes */}
        {[
          { x: 0, y: 180, w: 180, h: 420 },
          { x: 200, y: 130, w: 160, h: 470 },
          { x: 380, y: 210, w: 150, h: 390 },
          { x: 550, y: 150, w: 170, h: 450 },
          { x: 740, y: 170, w: 155, h: 430 },
          { x: 915, y: 110, w: 185, h: 490 },
          { x: 1120, y: 200, w: 160, h: 400 },
          { x: 1300, y: 140, w: 175, h: 460 },
          { x: 1495, y: 180, w: 150, h: 420 },
          { x: 1665, y: 160, w: 165, h: 440 },
        ].map((building, i) => (
          <rect
            key={i}
            x={building.x}
            y={building.y}
            width={building.w}
            height={building.h}
            fill="url(#heroBuilding)"
          />
        ))}
      </g>
    </svg>
  );
}

function HeroMiddleground({ progress }: any) {
  return (
    <>
      {/* Floating clouds */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 15}%`,
            width: `${120 + i * 10}px`,
            height: '60px',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '100px',
            filter: 'blur(20px)',
          }}
          animate={{
            x: [0, 100, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function HeroForeground({ progress }: any) {
  return (
    <>
      {/* Window lights */}
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
              ? '0 0 30px rgba(255, 198, 11, 0.8)'
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
      
      {/* Neon glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, rgba(255, 198, 11, 0.2), transparent)',
          filter: 'blur(30px)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </>
  );
}

// ===== SCENE 2: ABOUT (Office) =====
function AboutBackground({ progress }: any) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
      {/* Office windows grid */}
      <defs>
        <pattern id="officeWindows" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect x="10" y="10" width="80" height="80" fill="rgba(200, 220, 255, 0.15)" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#officeWindows)" />
      
      {/* Sky gradient */}
      <rect width="100%" height="40%" fill="url(#skyGradient)" />
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(135, 206, 250, 0.3)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AboutMiddleground({ progress }: any) {
  return (
    <>
      {/* Office furniture silhouettes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`furniture-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 15}%`,
            bottom: `${10 + (i % 2) * 10}%`,
            width: '100px',
            height: '80px',
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
      
      {/* Light panels */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`light-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 20}%`,
            top: '10%',
            width: '150px',
            height: '10px',
            background: 'rgba(255, 255, 255, 0.4)',
            boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </>
  );
}

function AboutForeground({ progress }: any) {
  return (
    <>
      {/* Mission/Vision/Values posters sliding in */}
      {['MISSION', 'VISION', 'VALUES'].map((text, i) => (
        <motion.div
          key={text}
          className="absolute glass-card"
          style={{
            left: i === 1 ? '40%' : i === 0 ? '10%' : '70%',
            top: `${25 + i * 15}%`,
            width: '180px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={{ x: i % 2 === 0 ? -200 : 200, opacity: 0 }}
          animate={{ x: 0, opacity: 0.9 }}
          transition={{ delay: i * 0.2, duration: 0.8 }}
        >
          <span className="heading-sm">{text}</span>
        </motion.div>
      ))}
    </>
  );
}

// ===== SCENE 3: WHY CHOOSE US (Museum) =====
function WhyChooseBackground({ progress }: any) {
  return (
    <div className="absolute inset-0">
      {/* Museum wall texture */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(240, 240, 240, 0.8), rgba(220, 220, 220, 0.6))',
        }}
      />
      
      {/* Wall panels */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
        <defs>
          <pattern id="wallPanels" width="200" height="300" patternUnits="userSpaceOnUse">
            <rect x="10" y="10" width="180" height="280" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wallPanels)" />
      </svg>
    </div>
  );
}

function WhyChooseMiddleground({ progress }: any) {
  return (
    <>
      {/* Holographic KPI pillars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`kpi-pillar-${i}`}
          className="absolute glass-strong"
          style={{
            left: `${10 + i * 15}%`,
            bottom: '20%',
            width: '120px',
            height: '250px',
            background: 'linear-gradient(to top, rgba(255, 198, 11, 0.2), rgba(255, 198, 11, 0.05))',
            border: '2px solid rgba(255, 198, 11, 0.3)',
          }}
          animate={{
            height: ['250px', `${280 + i * 20}px`, '250px'],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </>
  );
}

function WhyChooseForeground({ progress }: any) {
  return (
    <>
      {/* Floating experience counters & icons */}
      {[
        { text: '30+', label: 'Years' },
        { text: '250+', label: 'Clients' },
        { text: '500+', label: 'Projects' },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute glass-ultra text-center"
          style={{
            left: `${25 + i * 25}%`,
            top: `${30 + (i % 2) * 15}%`,
            width: '140px',
            padding: '20px',
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <div className="heading-lg" style={{ color: '#FFC60B' }}>{item.text}</div>
          <div className="body-sm">{item.label}</div>
        </motion.div>
      ))}
    </>
  );
}

// ===== SCENE 4: CORE SERVICES (Hall) =====
function CoreServicesBackground({ progress }: any) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
      {/* Hall perspective grid */}
      <defs>
        <pattern id="hallGrid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hallGrid)" />
      
      {/* Perspective lines */}
      <line x1="0" y1="540" x2="960" y2="200" stroke="rgba(0,0,0,0.1)" strokeWidth="3" />
      <line x1="1920" y1="540" x2="960" y2="200" stroke="rgba(0,0,0,0.1)" strokeWidth="3" />
    </svg>
  );
}

function CoreServicesMiddleground({ progress }: any) {
  return (
    <>
      {/* Service grid walls */}
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={`service-wall-${i}`}
          className="absolute glass-card"
          style={{
            left: `${5 + (i % 3) * 32}%`,
            top: `${15 + Math.floor(i / 3) * 30}%`,
            width: '240px',
            height: '200px',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </>
  );
}

function CoreServicesForeground({ progress }: any) {
  return (
    <>
      {/* Service cards flip-in */}
      {['DIGITAL', 'ADS', 'IT', 'MEDIA'].map((service, i) => (
        <motion.div
          key={service}
          className="absolute glass-ultra hover-lift-award"
          style={{
            left: `${15 + i * 20}%`,
            top: '40%',
            width: '180px',
            height: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ delay: i * 0.15, duration: 0.6 }}
        >
          <span className="heading-md">{service}</span>
        </motion.div>
      ))}
    </>
  );
}

// ===== SCENE 5: DIGITAL MARKETING (Control Room) =====
function DigitalMarketingBackground({ progress }: any) {
  return (
    <div className="absolute inset-0">
      {/* Control room back panels */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 30, 60, 0.3), rgba(0, 0, 0, 0.15))',
        }}
      />
      
      {/* Panel grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
        <defs>
          <pattern id="controlPanels" width="150" height="150" patternUnits="userSpaceOnUse">
            <rect x="5" y="5" width="140" height="140" fill="rgba(0, 50, 100, 0.1)" stroke="rgba(0, 200, 255, 0.2)" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#controlPanels)" />
      </svg>
    </div>
  );
}

function DigitalMarketingMiddleground({ progress }: any) {
  return (
    <>
      {/* Floating dashboards */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`dashboard-${i}`}
          className="absolute glass-strong"
          style={{
            left: `${10 + i * 18}%`,
            top: `${20 + (i % 2) * 25}%`,
            width: '200px',
            height: '140px',
            background: 'linear-gradient(135deg, rgba(0, 150, 255, 0.1), rgba(0, 100, 200, 0.05))',
          }}
          animate={{
            y: [0, -15, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </>
  );
}

function DigitalMarketingForeground({ progress }: any) {
  return (
    <>
      {/* SEO graph rising */}
      <motion.svg
        className="absolute"
        style={{ left: '20%', bottom: '25%' }}
        width="400"
        height="200"
        viewBox="0 0 400 200"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.path
          d="M 0 180 L 50 150 L 100 160 L 150 120 L 200 90 L 250 100 L 300 60 L 350 40 L 400 20"
          stroke="#4285F4"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      </motion.svg>
      
      {/* Orbiting social icons */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`social-${i}`}
          className="absolute w-12 h-12 rounded-full"
          style={{
            left: '50%',
            top: '40%',
            background: ['#1877F2', '#E4405F', '#1DA1F2', '#FF0000', '#0A66C2', '#25D366'][i],
            boxShadow: '0 0 20px currentColor',
          }}
          animate={{
            x: [0, Math.cos((i * Math.PI * 2) / 6) * 150],
            y: [0, Math.sin((i * Math.PI * 2) / 6) * 150],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </>
  );
}

// Dynamic gradient background
function SceneGradient({ sceneId, progress }: { sceneId: number; progress: any }) {
  const gradients = {
    1: 'radial-gradient(ellipse at 60% 40%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 30%, rgba(255,255,255,0.95) 60%)',
    2: 'radial-gradient(ellipse at 40% 50%, rgba(135, 206, 250, 0.2) 0%, rgba(255,255,255,0.95) 60%)',
    3: 'radial-gradient(ellipse at 50% 50%, rgba(255,198,11,0.15) 0%, rgba(255,255,255,0.95) 60%)',
    4: 'radial-gradient(ellipse at 60% 40%, rgba(0,0,0,0.12) 0%, rgba(255,255,255,0.95) 60%)',
    5: 'radial-gradient(ellipse at 50% 60%, rgba(0, 100, 200, 0.15) 0%, rgba(255,255,255,0.95) 60%)',
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background: gradients[sceneId as keyof typeof gradients] || gradients[1],
      }}
    />
  );
}

// Ambient particles
function AmbientParticles({ progress }: any) {
  return (
    <div className="absolute inset-0">
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '6px',
            height: '6px',
            background: i % 5 === 0 ? 'rgba(255,198,11,0.4)' : 'rgba(0,0,0,0.2)',
          }}
          animate={{
            y: [0, -1200],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 30 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Light rays
function LightRays({ progress }: any) {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-0 w-4 h-full"
          style={{
            left: `${20 + i * 30}%`,
            background: i % 2 === 0
              ? 'linear-gradient(180deg, transparent, rgba(255,198,11,0.3), transparent)'
              : 'linear-gradient(180deg, transparent, rgba(0,0,0,0.2), transparent)',
            opacity: 0.15,
          }}
          animate={{
            x: [0, 800, 1600],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 40 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 5,
          }}
        />
      ))}
    </>
  );
}

// Vignette
function Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.08) 100%)',
      }}
    />
  );
}
