import { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
  glowEffect?: boolean;
}

export function TiltCard3D({ 
  children, 
  className = '', 
  intensity = 15,
  scale = 1.02,
  glowEffect = true
}: TiltCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animation for smooth movement
  const springConfig = { stiffness: 150, damping: 15 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(percentX);
    mouseY.set(percentY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-full h-full"
      >
        {/* Glow effect on hover */}
        {glowEffect && (
          <motion.div
            className="absolute inset-0 rounded-[10px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(186, 255, 0, 0.15), transparent 70%)',
              opacity: isHovered ? 1 : 0,
              filter: 'blur(20px)',
              transform: 'translateZ(-10px)'
            }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Card content */}
        <div
          style={{
            transform: 'translateZ(20px)'
          }}
        >
          {children}
        </div>

        {/* Shine effect overlay */}
        <motion.div
          className="absolute inset-0 rounded-[10px] pointer-events-none"
          style={{
            background: `linear-gradient(135deg, 
              transparent 0%, 
              rgba(255, 255, 255, 0.1) 40%, 
              rgba(255, 255, 255, 0.3) 50%, 
              rgba(255, 255, 255, 0.1) 60%, 
              transparent 100%)`,
            opacity: isHovered ? 0.6 : 0,
            mixBlendMode: 'overlay'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

// Stacked 3D Cards (like reference images)
interface StackedCards3DProps {
  cards: Array<{
    id: string;
    content: React.ReactNode;
  }>;
  className?: string;
}

export function StackedCards3D({ cards, className = '' }: StackedCards3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={`relative ${className}`} style={{ perspective: '2000px' }}>
      <div className="relative h-[500px]">
        {cards.map((card, index) => {
          const offset = index - activeIndex;
          const isActive = index === activeIndex;
          
          return (
            <motion.div
              key={card.id}
              className="absolute top-0 left-1/2 w-full max-w-md cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                zIndex: cards.length - Math.abs(offset)
              }}
              initial={false}
              animate={{
                x: '-50%',
                y: offset * 60,
                scale: isActive ? 1 : 0.9 - Math.abs(offset) * 0.05,
                rotateX: offset * -3,
                opacity: 1 - Math.abs(offset) * 0.2,
                filter: isActive ? 'none' : `blur(${Math.abs(offset) * 2}px)`
              }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 20
              }}
              onClick={() => !isActive && setActiveIndex(index)}
            >
              <TiltCard3D intensity={isActive ? 15 : 5}>
                {card.content}
              </TiltCard3D>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-8">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="transition-all duration-300"
            style={{
              width: index === activeIndex ? '32px' : '8px',
              height: '8px',
              borderRadius: '10px',
              background: index === activeIndex 
                ? '#1a1a1a'
                : '#e5e5e5'
            }}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}