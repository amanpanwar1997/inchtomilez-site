// Enhanced Inchy Avatar - Modern, Animated, Premium
import { motion } from 'motion/react';

export function InchyAvatar({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Animated Outer Ring */}
      <motion.circle 
        cx="50" 
        cy="50" 
        r="46" 
        stroke="url(#ringGradient)" 
        strokeWidth="2"
        fill="none"
        initial={{ strokeDasharray: "0 289" }}
        animate={{ strokeDasharray: "289 0" }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Main Circle - Glass Effect */}
      <circle cx="50" cy="50" r="42" fill="url(#glassGradient)" opacity="0.95" />
      
      {/* Inner Glow */}
      <circle cx="50" cy="50" r="38" fill="url(#innerGlow)" opacity="0.6" />
      
      {/* Stylized 'I' - Bold & Modern */}
      <g filter="url(#shadow)">
        <path
          d="M50 28 L50 72 M43 28 L57 28 M43 72 L57 72"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />
      </g>
      
      {/* AI Spark Particles - Top Right */}
      <motion.g
        animate={{ 
          y: [0, -3, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="68" cy="32" r="3" fill="#FFC60B" />
        <circle cx="68" cy="32" r="6" fill="#FFC60B" opacity="0.3" />
      </motion.g>
      
      {/* AI Spark Particles - Bottom Left */}
      <motion.g
        animate={{ 
          y: [0, 3, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <circle cx="32" cy="68" r="2.5" fill="#BAFF00" />
        <circle cx="32" cy="68" r="5" fill="#BAFF00" opacity="0.3" />
      </motion.g>
      
      {/* Additional Sparkle - Right */}
      <motion.circle 
        cx="70" cy="50" 
        r="2" 
        fill="#BAFF00"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      
      {/* Additional Sparkle - Left */}
      <motion.circle 
        cx="30" cy="50" 
        r="1.5" 
        fill="#FFC60B"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      
      {/* Rotating Accent Arc */}
      <motion.circle
        cx="50"
        cy="50"
        r="44"
        stroke="url(#accentGradient)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="20 260"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 50px" }}
      />
      
      {/* Gradients & Effects */}
      <defs>
        {/* Glass Gradient */}
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f5f5f5" stopOpacity="0.95" />
        </linearGradient>
        
        {/* Inner Glow */}
        <radialGradient id="innerGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#BAFF00" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#FFC60B" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        
        {/* Ring Gradient */}
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFC60B" />
          <stop offset="50%" stopColor="#BAFF00" />
          <stop offset="100%" stopColor="#FFC60B" />
        </linearGradient>
        
        {/* Accent Gradient */}
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#BAFF00" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFC60B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#BAFF00" stopOpacity="0.6" />
        </linearGradient>
        
        {/* Shadow Filter */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.15"/>
        </filter>
      </defs>
    </svg>
  );
}

// Simplified animated version for small sizes
export function InchyAvatarSimple({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="url(#simpleGlass)" />
      <circle cx="50" cy="50" r="40" fill="url(#simpleInner)" opacity="0.4" />
      <path
        d="M50 32 L50 68 M46 32 L54 32 M46 68 L54 68"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <motion.circle 
        cx="65" cy="35" 
        r="2.5" 
        fill="#FFC60B"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle 
        cx="35" cy="65" 
        r="2" 
        fill="#BAFF00"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
      />
      <defs>
        <linearGradient id="simpleGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f8f8f8" />
        </linearGradient>
        <radialGradient id="simpleInner">
          <stop offset="0%" stopColor="#BAFF00" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  );
}