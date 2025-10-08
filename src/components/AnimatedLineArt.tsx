import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function AnimatedLineArt() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate network nodes
  const nodes = [
    { x: 10, y: 15 },
    { x: 25, y: 10 },
    { x: 40, y: 20 },
    { x: 60, y: 15 },
    { x: 75, y: 25 },
    { x: 90, y: 20 },
    { x: 15, y: 40 },
    { x: 35, y: 45 },
    { x: 55, y: 50 },
    { x: 70, y: 45 },
    { x: 85, y: 55 },
    { x: 20, y: 70 },
    { x: 45, y: 75 },
    { x: 65, y: 80 },
    { x: 80, y: 75 },
    { x: 30, y: 90 },
    { x: 50, y: 95 },
    { x: 70, y: 90 }
  ];

  // Connect nearby nodes with lines
  const connections = nodes.flatMap((node, i) => 
    nodes.slice(i + 1).filter(other => {
      const dx = node.x - other.x;
      const dy = node.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 30;
    }).map(other => ({ from: node, to: other }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] z-0">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Animated Grid Lines */}
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="black"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />

        {/* Floating Geometric Shapes */}
        <motion.circle
          cx="20%"
          cy="30%"
          r="150"
          fill="none"
          stroke="black"
          strokeWidth="1"
          opacity="0.3"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.circle
          cx="80%"
          cy="70%"
          r="100"
          fill="none"
          stroke="black"
          strokeWidth="1"
          opacity="0.3"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Animated Hexagons */}
        <motion.path
          d="M 60,20 L 80,30 L 80,50 L 60,60 L 40,50 L 40,30 Z"
          fill="none"
          stroke="black"
          strokeWidth="1"
          opacity="0.4"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: '60px 40px' }}
        />

        {/* Network Connections */}
        {connections.map((conn, i) => (
          <motion.line
            key={i}
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke="black"
            strokeWidth="0.5"
            opacity="0.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0.1, 0.3, 0.1],
              strokeWidth: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}



        {/* Flowing Curved Lines */}
        <motion.path
          d="M 0,50 Q 25,30 50,50 T 100,50"
          fill="none"
          stroke="black"
          strokeWidth="1"
          opacity="0.2"
          animate={{
            d: [
              "M 0,50 Q 25,30 50,50 T 100,50",
              "M 0,50 Q 25,70 50,50 T 100,50",
              "M 0,50 Q 25,30 50,50 T 100,50"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.path
          d="M 0,30 Q 25,50 50,30 T 100,30"
          fill="none"
          stroke="black"
          strokeWidth="1"
          opacity="0.2"
          animate={{
            d: [
              "M 0,30 Q 25,50 50,30 T 100,30",
              "M 0,30 Q 25,10 50,30 T 100,30",
              "M 0,30 Q 25,50 50,30 T 100,30"
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Elements */}
        <motion.g
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '50% 50%' }}
        >
          <circle cx="50%" cy="20%" r="2" fill="black" opacity="0.5" />
          <circle cx="50%" cy="80%" r="2" fill="black" opacity="0.5" />
          <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="black" strokeWidth="0.5" opacity="0.2" />
        </motion.g>

        {/* Diagonal Lines Pattern */}
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={`diag-${i}`}
            x1="0"
            y1={`${i * 15}%`}
            x2="100%"
            y2={`${(i * 15) + 10}%`}
            stroke="black"
            strokeWidth="0.3"
            opacity="0.1"
            animate={{
              x1: ["-10%", "110%"],
              x2: ["90%", "210%"],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 15,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Mouse-following gradient */}
        <defs>
          <radialGradient id="mouseGlow">
            <stop offset="0%" stopColor="black" stopOpacity="0.1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.circle
          cx={`${mousePosition.x * 100}%`}
          cy={`${mousePosition.y * 100}%`}
          r="200"
          fill="url(#mouseGlow)"
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Triangular Pattern */}
        {[...Array(6)].map((_, i) => (
          <motion.path
            key={`tri-${i}`}
            d={`M ${15 + i * 15},10 L ${20 + i * 15},20 L ${10 + i * 15},20 Z`}
            fill="none"
            stroke="black"
            strokeWidth="0.5"
            opacity="0.2"
            animate={{
              rotate: [0, 360],
              y: [0, 10, 0]
            }}
            transition={{
              duration: 10,
              delay: i * 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: `${15 + i * 15}px 15px` }}
          />
        ))}
      </svg>


    </div>
  );
}