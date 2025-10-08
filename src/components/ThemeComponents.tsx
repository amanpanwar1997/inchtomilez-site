import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

// Simple wrapper without scroll animations - just displays content
export function RevealOnScroll({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  delay?: number; 
}) {
  return (
    <div>
      {children}
    </div>
  );
}

// Glass Card Component with ultra-shining effect
export function GlassCard({ 
  children, 
  className = '',
  hover = true,
  variant = 'default',
  ...props 
}: { 
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'strong' | 'light';
  [key: string]: any;
}) {
  const variantClass = variant === 'strong' ? 'glass-ultra-strong' : 
                       variant === 'light' ? 'glass-ultra-light' : 
                       'glass-ultra';

  return (
    <motion.div
      className={`${variantClass} rounded-3xl ${className}`}
      whileHover={hover ? { 
        scale: 1.02,
        y: -4,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Section Wrapper with consistent spacing - Fully Responsive
export function Section({ 
  children, 
  className = '',
  spacing = 'default'
}: { 
  children: React.ReactNode;
  className?: string;
  spacing?: 'default' | 'sm' | 'lg';
}) {
  const spacingClass = spacing === 'sm' ? 'section-spacing-sm' : 
                       spacing === 'lg' ? 'section-spacing-lg' : 
                       'section-spacing';
  
  return (
    <section className={`${spacingClass} ${className}`}>
      <div className="container-responsive">
        {children}
      </div>
    </section>
  );
}

// Stat Card Component
export function StatCard({ 
  value, 
  label,
  icon: Icon,
  delay = 0
}: { 
  value: string | number;
  label: string;
  icon?: any;
  delay?: number;
}) {
  return (
    <RevealOnScroll delay={delay}>
      <motion.div
        className="glass-ultra p-5 sm:p-6 rounded-3xl text-center group relative overflow-hidden transition-colors duration-300"
        whileHover={{ 
          scale: 1.05,
          y: -6,
          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Dark hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        <div className="relative z-10 group-hover:text-white transition-colors duration-300">
          {Icon && (
            <motion.div 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black/5 group-hover:bg-white/10 flex items-center justify-center mb-3 sm:mb-4 mx-auto transition-colors duration-300"
              whileHover={{ 
                scale: 1.15,
                rotate: 5,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-black group-hover:text-white transition-colors duration-300" />
            </motion.div>
          )}
          <div className="heading-lg text-black group-hover:text-white mb-1 transition-colors duration-300">{value}</div>
          <div className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 transition-colors duration-300">{label}</div>
        </div>
      </motion.div>
    </RevealOnScroll>
  );
}

// Feature Card Component
export function FeatureCard({ 
  icon: Icon,
  title,
  description,
  delay = 0
}: { 
  icon: any;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <RevealOnScroll delay={delay}>
      <motion.div
        className="glass-ultra p-6 sm:p-8 rounded-3xl group h-full relative overflow-hidden transition-colors duration-300"
        whileHover={{ 
          scale: 1.03,
          y: -8,
          transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Dark hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        <div className="relative z-10 group-hover:text-white transition-colors duration-300">
          <motion.div 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black/5 group-hover:bg-white/10 flex items-center justify-center mb-4 sm:mb-6 transition-colors duration-300"
            whileHover={{ 
              scale: 1.15,
              rotate: 10,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-black group-hover:text-white transition-colors duration-300" />
          </motion.div>
          <h3 className="heading-sm mb-3 text-black group-hover:text-white transition-colors duration-300">{title}</h3>
          <p className="text-gray-600 group-hover:text-gray-300 text-sm sm:text-base leading-relaxed transition-colors duration-300">{description}</p>
        </div>
      </motion.div>
    </RevealOnScroll>
  );
}

// Service Card Component
export function ServiceCard({ 
  icon: Icon,
  title,
  description,
  features,
  onClick,
  delay = 0
}: { 
  icon: any;
  title: string;
  description: string;
  features?: string[];
  onClick?: () => void;
  delay?: number;
}) {
  return (
    <RevealOnScroll delay={delay}>
      <motion.div
        className="glass-ultra p-6 rounded-3xl hover-lift group cursor-pointer relative overflow-hidden transition-colors duration-300"
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
      >
        {/* Dark hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        <div className="relative z-10">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-black/5 group-hover:bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
              <Icon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="flex-1">
              <h3 className="heading-sm mb-2 text-black group-hover:text-white transition-colors duration-300">{title}</h3>
              <p className="text-gray-600 group-hover:text-gray-300 text-sm transition-colors duration-300">{description}</p>
            </div>
          </div>
          {features && features.length > 0 && (
            <div className="space-y-2 mt-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-600 group-hover:text-gray-300 transition-colors duration-300">
                  <div className="w-1 h-1 rounded-full bg-black mr-2" />
                  {feature}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </RevealOnScroll>
  );
}

// CTA Button Component - Fully Responsive
export function CTAButton({ 
  children,
  onClick,
  variant = 'primary',
  icon: Icon,
  className = '',
  fullWidth = false
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  icon?: any;
  className?: string;
  fullWidth?: boolean;
}) {
  const baseClasses = "px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium shadow-strong flex items-center justify-center relative overflow-hidden group transition-all duration-300 text-sm sm:text-base";
  const variantClasses = variant === 'primary' 
    ? "bg-black text-white"
    : "border-2 border-black text-black bg-white";
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses} ${widthClass} ${className}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        y: -2,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated background on hover */}
      <motion.div
        className={`absolute inset-0 ${variant === 'primary' ? 'bg-gray-700' : 'bg-black'}`}
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
      
      <span className={`relative z-10 flex items-center ${variant === 'primary' ? 'group-hover:text-black' : 'group-hover:text-white'} transition-colors duration-300`}>
        {children}
        {Icon && <Icon className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />}
      </span>
    </motion.button>
  );
}

// Interactive 3D Tilt Card with mouse tracking
export function TiltCard({ 
  children, 
  className = ''
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <motion.div
      className={`glass-ultra rounded-3xl ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </motion.div>
  );
}

// Glass Section Wrapper - For 80% glassmorphism coverage
export function GlassSection({ 
  children, 
  className = '',
  spacing = 'default'
}: { 
  children: React.ReactNode;
  className?: string;
  spacing?: 'default' | 'sm' | 'lg';
}) {
  const spacingClass = spacing === 'sm' ? 'py-8 sm:py-12' : 
                       spacing === 'lg' ? 'py-16 sm:py-24' : 
                       'py-12 sm:py-16 lg:py-20';
  
  return (
    <div className={`glass-section ${spacingClass} ${className}`}>
      {children}
    </div>
  );
}

// Glass Container - For 80% glassmorphism coverage
export function GlassContainer({ 
  children, 
  className = ''
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass-container rounded-3xl p-6 sm:p-8 lg:p-10 ${className}`}>
      {children}
    </div>
  );
}

// Glass Badge with animated icon
export function GlassBadge({ 
  children, 
  icon: Icon,
  animation = 'pulse',
  className = ''
}: { 
  children: React.ReactNode;
  icon?: any;
  animation?: 'float' | 'pulse' | 'bounce' | 'rotate' | 'spin' | 'swing' | 'scale';
  className?: string;
}) {
  const animations = {
    float: { y: [0, -4, 0] },
    pulse: { scale: [1, 1.1, 1] },
    bounce: { y: [0, -8, 0, -4, 0] },
    rotate: { rotate: [0, 360] },
    spin: { rotate: [0, 180, 0, -180, 0] },
    swing: { rotate: [0, 10, 0, -10, 0] },
    scale: { scale: [1, 1.15, 1, 0.95, 1] }
  };

  return (
    <motion.div
      className={`glass-badge px-4 py-2 rounded-full inline-flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {Icon && (
        <motion.div
          animate={animations[animation]}
          transition={{
            duration: animation === 'rotate' ? 20 : 2,
            repeat: Infinity,
            ease: animation === 'rotate' ? 'linear' : 'easeInOut'
          }}
        >
          <Icon size={16} />
        </motion.div>
      )}
      <span className="font-medium text-sm">{children}</span>
    </motion.div>
  );
}

// Glass Input Field
export function GlassInput({ 
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  icon: Icon
}: { 
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  icon?: any;
}) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`glass-input w-full px-4 ${Icon ? 'pl-11' : ''} py-3 rounded-xl text-sm focus:outline-none transition-all duration-300 ${className}`}
      />
    </div>
  );
}

// Glass Button with animated icon
export function GlassButton({ 
  children,
  onClick,
  icon: Icon,
  animation = 'pulse',
  variant = 'default',
  className = ''
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  icon?: any;
  animation?: 'float' | 'pulse' | 'bounce' | 'rotate' | 'spin' | 'swing' | 'scale';
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}) {
  const variantClass = variant === 'primary' ? 'bg-black text-white hover:bg-gray-700' :
                       variant === 'secondary' ? 'bg-[#ffc60b] text-black hover:bg-[#f0b800]' :
                       'glass-button hover:glass-button-hover';

  const animations = {
    float: { y: [0, -4, 0] },
    pulse: { scale: [1, 1.1, 1] },
    bounce: { y: [0, -8, 0, -4, 0] },
    rotate: { rotate: [0, 360] },
    spin: { rotate: [0, 180, 0, -180, 0] },
    swing: { rotate: [0, 10, 0, -10, 0] },
    scale: { scale: [1, 1.15, 1, 0.95, 1] }
  };

  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2 transition-all duration-300 ${variantClass} ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{children}</span>
      {Icon && (
        <motion.div
          animate={animations[animation]}
          transition={{
            duration: animation === 'rotate' ? 20 : 2,
            repeat: Infinity,
            ease: animation === 'rotate' ? 'linear' : 'easeInOut'
          }}
        >
          <Icon size={18} />
        </motion.div>
      )}
    </motion.button>
  );
}