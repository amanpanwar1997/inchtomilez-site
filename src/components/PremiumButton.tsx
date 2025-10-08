import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';

interface PremiumButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'glow' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
}

export function PremiumButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  icon,
  className = ''
}: PremiumButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-black text-white hover:bg-white hover:text-black border-2 border-black',
    outline: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white',
    glow: 'bg-black text-white border-2 border-transparent hover:border-white',
    gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0'
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-lg font-semibold
        transition-all duration-300 ease-out
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 400, height: 400, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      {/* Shimmer Effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
        {children}
      </span>

      {/* Glow Effect for 'glow' variant */}
      {variant === 'glow' && (
        <motion.span
          className="absolute inset-0 blur-xl opacity-0"
          style={{ background: 'rgba(66, 133, 244, 0.5)' }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}
