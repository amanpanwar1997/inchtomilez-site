import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax transforms for different layers
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const layer4Y = useTransform(scrollYProgress, [0, 1], [0, -800]);
  
  const rotateZ1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotateZ2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rotateZ3 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.2]);
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 0.3]);
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0, 1, 0.4]);
  const opacity3 = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 0.3]);
  const opacity4 = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0.4]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-white">
      {/* Pure White Background */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Layer 1 - Background Circles (Slowest) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: layer1Y, scale: scale1 }}
      >
        {/* Large Gradient Circle - Top Left */}
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.025) 0%, transparent 70%)',
            filter: 'blur(100px)',
            opacity: opacity1
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Large Gradient Circle - Bottom Right */}
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
            filter: 'blur(100px)',
            opacity: opacity1
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>

      {/* Layer 2 - Geometric Shapes (Medium Speed) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: layer2Y }}
      >
        {/* Rotating Square Outline */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px]"
          style={{
            border: '1px solid rgba(0,0,0,0.03)',
            borderRadius: '10px',
            opacity: opacity2,
            rotateZ: rotateZ1
          }}
        />
        
        {/* Diamond Shape */}
        <motion.div
          className="absolute top-[40%] right-[15%] w-[200px] h-[200px]"
          style={{
            border: '1px solid rgba(0,0,0,0.04)',
            transform: 'rotate(45deg)',
            borderRadius: '10px',
            opacity: opacity2,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [45, 60, 45]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Yellow Accent Circle - Subtle */}
        <motion.div
          className="absolute top-[60%] left-[20%] w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 198, 11, 0.015) 0%, transparent 60%)',
            filter: 'blur(80px)',
            opacity: opacity2
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      {/* Layer 3 - Geometric Lines & Patterns (Fast) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: layer3Y, scale: scale2 }}
      >
        {/* Diagonal Lines */}
        <motion.div
          className="absolute top-[10%] right-[25%] w-[400px] h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent)',
            opacity: opacity3,
            rotateZ: rotateZ2
          }}
        />
        
        <motion.div
          className="absolute top-[50%] left-[15%] w-[350px] h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.04), transparent)',
            opacity: opacity3,
            rotate: 135
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Small Hexagon Outlines */}
        <motion.div
          className="absolute top-[30%] left-[40%] w-[150px] h-[150px]"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            border: '1px solid rgba(0,0,0,0.025)',
            opacity: opacity3,
            rotateZ: rotateZ3
          }}
        />
        
        <motion.div
          className="absolute bottom-[25%] right-[35%] w-[120px] h-[120px]"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            border: '1px solid rgba(0,0,0,0.03)',
            opacity: opacity3
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Layer 4 - Floating Particles & Dots (Fastest) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: layer4Y }}
      >
        {/* Animated Dots */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 5 === 0 
                ? 'rgba(255, 198, 11, 0.2)' 
                : 'rgba(0,0,0,0.1)',
              left: `${(i * 7 + 10) % 90}%`,
              top: `${(i * 11 + 5) % 95}%`,
              opacity: opacity4
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 10 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
        
        {/* Ring Shapes */}
        <motion.div
          className="absolute top-[15%] right-[20%] w-[180px] h-[180px] rounded-full"
          style={{
            border: '2px solid rgba(0,0,0,0.02)',
            opacity: opacity4
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 0]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-[30%] left-[25%] w-[220px] h-[220px] rounded-full"
          style={{
            border: '1px solid rgba(0,0,0,0.025)',
            opacity: opacity4
          }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -180, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>

      {/* Subtle Gradient Overlay for Depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%)',
        }}
      />
    </div>
  );
}
