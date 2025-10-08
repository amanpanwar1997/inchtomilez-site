import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ReactNode, useRef } from 'react';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | '3d-tilt' | 'magnetic' | 'glow';
  onClick?: () => void;
}

export function PremiumCard({ 
  children, 
  className = '', 
  variant = 'default',
  onClick 
}: PremiumCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (variant !== '3d-tilt' && variant !== 'magnetic') return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    default: (
      <motion.div
        className={`glass-card hover-lift-award ${className}`}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    ),
    '3d-tilt': (
      <motion.div
        ref={ref}
        className={`glass-card ${className}`}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div style={{ transform: 'translateZ(50px)' }}>
          {children}
        </div>
      </motion.div>
    ),
    'magnetic': (
      <motion.div
        ref={ref}
        className={`glass-card ${className}`}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20])
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    ),
    'glow': (
      <motion.div
        className={`glass-card relative ${className}`}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute -inset-[2px] rounded-lg opacity-0 -z-10"
          style={{
            background: 'linear-gradient(45deg, #4285F4, #EA4335, #FBBC05, #34A853, #9333EA, #4285F4)',
            backgroundSize: '300% 300%'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
          whileHover={{ opacity: 1 }}
        />
        
        {children}
      </motion.div>
    )
  };

  return variants[variant];
}

interface GlassCardStackProps {
  cards: Array<{
    title: string;
    description: string;
    icon?: ReactNode;
  }>;
  className?: string;
}

export function GlassCardStack({ cards, className = '' }: GlassCardStackProps) {
  return (
    <div className={`relative ${className}`}>
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="glass-card p-6 absolute top-0 left-0 w-full"
          initial={{ 
            y: index * 20,
            scale: 1 - index * 0.05,
            opacity: 1 - index * 0.2,
            zIndex: cards.length - index
          }}
          whileHover={{
            y: index * 30 - 10,
            scale: 1,
            opacity: 1,
            zIndex: cards.length
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {card.icon && (
            <div className="mb-4 icon-container-glass w-12 h-12 flex items-center justify-center">
              {card.icon}
            </div>
          )}
          <h3 className="heading-md mb-2">{card.title}</h3>
          <p className="body-sm text-gray-600">{card.description}</p>
        </motion.div>
      ))}
      
      {/* Spacer to maintain height */}
      <div style={{ height: `${cards.length * 20 + 200}px` }} />
    </div>
  );
}

interface ExpandableCardProps {
  title: string;
  preview: ReactNode;
  expanded: ReactNode;
  className?: string;
}

export function ExpandableCard({ title, preview, expanded, className = '' }: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.div
      className={`glass-card p-6 cursor-pointer ${className}`}
      onClick={() => setIsExpanded(!isExpanded)}
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={{ scale: isExpanded ? 1 : 1.02 }}
    >
      <motion.div layout="position">
        <h3 className="heading-md mb-4">{title}</h3>
        {!isExpanded && preview}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isExpanded ? 1 : 0,
          height: isExpanded ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {expanded}
      </motion.div>

      <motion.div 
        className="mt-4 flex items-center gap-2 text-gray-600"
        whileHover={{ x: 5 }}
      >
        <span className="body-sm">{isExpanded ? 'Show less' : 'Show more'}</span>
        <motion.svg
          className="w-4 h-4"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

const React = { useState: require('react').useState };
