import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GradientHeadingProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  gradient?: 'primary' | 'secondary' | 'vibrant' | 'dark';
  animate?: boolean;
}

export function GradientHeading({ 
  children, 
  className = '', 
  as: Component = 'h2',
  gradient = 'primary',
  animate = true
}: GradientHeadingProps) {
  
  const gradients = {
    primary: 'from-black via-gray-800 to-black',
    secondary: 'from-gray-900 via-[#baff00] to-gray-900',
    vibrant: 'from-black via-[#baff00] via-gray-700 to-black',
    dark: 'from-gray-900 via-gray-600 to-gray-900'
  };

  return (
    <Component 
      className={`font-antonio bg-gradient-to-r ${gradients[gradient]} bg-clip-text text-transparent ${className}`}
    >
      {animate ? (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-block"
          style={{
            backgroundImage: `linear-gradient(90deg, 
              #000000 0%, 
              #1a1a1a 15%,
              #baff00 30%, 
              #ffc60b 50%,
              #baff00 70%,
              #1a1a1a 85%,
              #000000 100%
            )`,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient-shift 8s ease infinite'
          }}
        >
          {children}
        </motion.span>
      ) : children}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }
      `}</style>
    </Component>
  );
}

// Utility component for subheadings with subtle gradient
export function GradientSubheading({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`font-raleway bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: '200% auto',
        animation: 'gradient-shift 10s ease infinite'
      }}
    >
      {children}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }
      `}</style>
    </motion.p>
  );
}

// Badge with gradient animation
export function GradientBadge({ 
  children, 
  className = '',
  icon: Icon
}: { 
  children: ReactNode; 
  className?: string;
  icon?: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center px-6 py-2 glass-green rounded-full shadow-sm text-sm ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(186, 255, 0, 0.1), rgba(255, 198, 11, 0.1))',
        border: '1px solid rgba(186, 255, 0, 0.3)'
      }}
    >
      {Icon && <Icon className="h-4 w-4 text-black mr-2" />}
      <span className="text-black font-raleway font-medium">{children}</span>
    </motion.div>
  );
}