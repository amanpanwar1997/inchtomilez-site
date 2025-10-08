import { motion } from 'motion/react';
import { useState, ReactNode } from 'react';

interface ParticleHoverProps {
  children: ReactNode;
  className?: string;
  particleCount?: number;
  particleColor?: string;
}

export function ParticleHover({ 
  children, 
  className = '', 
  particleCount = 20,
  particleColor = '#4285F4'
}: ParticleHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height
    }));
    
    setParticles(newParticles);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setParticles([]);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Particle Layer */}
      {isHovered && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            backgroundColor: particleColor,
            left: particle.x,
            top: particle.y
          }}
          initial={{ 
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, -30],
            x: particle.x + (Math.random() - 0.5) * 40
          }}
          transition={{
            duration: 1.5,
            ease: 'easeOut',
            delay: Math.random() * 0.3
          }}
        />
      ))}

      {/* Content */}
      {children}
    </div>
  );
}
