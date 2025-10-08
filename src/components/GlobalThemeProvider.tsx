/**
 * 🎨 GLOBAL THEME PROVIDER - CENTRALIZED UI/UX SYSTEM
 * 
 * This component provides a centralized theme system that applies premium
 * UI/UX enhancements across ALL pages automatically.
 * 
 * When you upgrade the homepage UI/UX, this system ensures ALL pages
 * get the same premium treatment automatically.
 * 
 * Usage:
 * import { ThemeBadge, ThemeCard, ThemeButton, ThemeHeading } from './GlobalThemeProvider';
 */

import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

// ============================================================================
// THEME CONFIGURATION - SINGLE SOURCE OF TRUTH
// ============================================================================

export const THEME_CONFIG = {
  // Premium Badge Styles
  badge: {
    base: 'bg-black text-white hover-glow-white animate-pulse-glow',
    sizes: {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    }
  },
  
  // Premium Card Styles
  card: {
    base: 'glass-premium hover-lift-md hover-glow-white shadow-elegant border-gradient-subtle animate-fade-in-up',
    variants: {
      elegant: 'glass-premium shadow-elegant',
      dramatic: 'glass-premium shadow-dramatic',
      cinematic: 'glass-premium shadow-cinematic',
    }
  },
  
  // Premium Button Styles
  button: {
    primary: 'bg-black text-white hover:bg-gray-900 btn-ripple hover-scale-sm shadow-cinematic',
    secondary: 'border-2 border-black text-black hover:bg-black hover:text-white btn-ripple hover-scale-sm',
    outline: 'border-2 border-black text-black hover:bg-black hover:text-white btn-ripple',
  },
  
  // Premium Heading Styles
  heading: {
    gradient: 'text-gradient-shine',
    shimmer: 'text-gradient-bw',
    solid: 'text-black',
  },
  
  // Premium Icon Styles
  icon: {
    interactive: 'icon-interactive',
    animated: 'icon-animated',
    float: 'icon-float',
  },
  
  // Premium Input Styles
  input: {
    base: 'focus-ring-elegant',
    glass: 'glass-input focus-ring-elegant',
  },
  
  // Animation Delays for Stagger
  stagger: {
    delays: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
  }
};

// ============================================================================
// THEME COMPONENTS - REUSABLE UI ELEMENTS
// ============================================================================

/**
 * THEME BADGE - Premium badge component
 * Automatically applies premium styling with pulse glow
 */
interface ThemeBadgeProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  className?: string;
}

export function ThemeBadge({ 
  children, 
  size = 'md', 
  icon: Icon,
  className = '' 
}: ThemeBadgeProps) {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 rounded-xl ${THEME_CONFIG.badge.base} ${THEME_CONFIG.badge.sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {Icon && <Icon className={`w-4 h-4 ${THEME_CONFIG.icon.interactive}`} />}
      {children}
    </motion.div>
  );
}

/**
 * THEME CARD - Premium card component
 * Automatically applies glass morphism, shadows, and hover effects
 */
interface ThemeCardProps {
  children: ReactNode;
  variant?: 'elegant' | 'dramatic' | 'cinematic';
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export function ThemeCard({ 
  children, 
  variant = 'elegant',
  className = '',
  delay = 0,
  onClick
}: ThemeCardProps) {
  return (
    <motion.div
      className={`${THEME_CONFIG.card.variants[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/**
 * THEME BUTTON - Premium button component
 * Automatically applies ripple effects, shadows, and hover states
 */
interface ThemeButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeButton({ 
  children, 
  variant = 'primary',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  onClick,
  size = 'md'
}: ThemeButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      className={`inline-flex items-center gap-2 rounded-xl font-semibold ${THEME_CONFIG.button[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {Icon && iconPosition === 'left' && <Icon className={`w-5 h-5 ${THEME_CONFIG.icon.interactive}`} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className={`w-5 h-5 ${THEME_CONFIG.icon.interactive}`} />}
    </motion.button>
  );
}

/**
 * THEME HEADING - Premium heading component
 * Automatically applies gradient/shimmer effects
 */
interface ThemeHeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'gradient' | 'shimmer' | 'solid';
  className?: string;
}

export function ThemeHeading({ 
  children, 
  level = 1,
  variant = 'gradient',
  className = ''
}: ThemeHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const levelClasses = {
    1: 'heading-xl',
    2: 'heading-lg',
    3: 'heading-md',
    4: 'heading-sm',
    5: 'subheading',
    6: 'subheading',
  };

  return (
    <Tag className={`${levelClasses[level]} ${THEME_CONFIG.heading[variant]} ${className}`}>
      {children}
    </Tag>
  );
}

/**
 * THEME ICON - Premium icon wrapper
 * Automatically applies interactive animations
 */
interface ThemeIconProps {
  icon: LucideIcon;
  variant?: 'interactive' | 'animated' | 'float';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function ThemeIcon({ 
  icon: Icon, 
  variant = 'interactive',
  size = 'md',
  className = ''
}: ThemeIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <Icon className={`${sizeClasses[size]} ${THEME_CONFIG.icon[variant]} ${className}`} />
  );
}

/**
 * THEME INPUT - Premium input component
 * Automatically applies focus rings and glass effects
 */
interface ThemeInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  glass?: boolean;
  className?: string;
}

export function ThemeInput({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  glass = false,
  className = ''
}: ThemeInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`px-4 py-3 rounded-xl border-2 border-gray-200 ${glass ? THEME_CONFIG.input.glass : THEME_CONFIG.input.base} ${className}`}
    />
  );
}

/**
 * THEME SECTION - Premium section wrapper
 * Automatically applies glass backgrounds and spacing
 */
interface ThemeSectionProps {
  children: ReactNode;
  glass?: 'light' | 'medium' | 'strong';
  className?: string;
}

export function ThemeSection({ 
  children, 
  glass,
  className = ''
}: ThemeSectionProps) {
  const glassClasses = {
    light: 'glass-section-light',
    medium: 'glass-section-medium',
    strong: 'glass-section-strong',
  };

  return (
    <section className={`py-12 sm:py-16 lg:py-24 ${glass ? glassClasses[glass] : ''} ${className}`}>
      {children}
    </section>
  );
}

/**
 * THEME GRID - Premium grid layout
 * Automatically applies stagger animations
 */
interface ThemeGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ThemeGrid({ 
  children, 
  columns = 3,
  gap = 'md',
  className = ''
}: ThemeGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

/**
 * THEME ICON CONTAINER - Premium icon background
 * Automatically applies glass morphism and hover effects
 */
interface ThemeIconContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ThemeIconContainer({ 
  children, 
  size = 'md',
  className = ''
}: ThemeIconContainerProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  return (
    <div className={`${sizeClasses[size]} rounded-xl icon-container-glass flex items-center justify-center hover-scale-lg ${className}`}>
      {children}
    </div>
  );
}

// ============================================================================
// THEME UTILITIES - HELPER FUNCTIONS
// ============================================================================

/**
 * Get stagger delay for animations
 */
export function getStaggerDelay(index: number): number {
  return THEME_CONFIG.stagger.delays[index % THEME_CONFIG.stagger.delays.length];
}

/**
 * Get stagger delay class for CSS animations
 */
export function getStaggerDelayClass(index: number): string {
  const delayIndex = (index % 6) + 1;
  return `stagger-delay-${delayIndex}`;
}

// ============================================================================
// EXPORT ALL THEME COMPONENTS
// ============================================================================

export default {
  Badge: ThemeBadge,
  Card: ThemeCard,
  Button: ThemeButton,
  Heading: ThemeHeading,
  Icon: ThemeIcon,
  Input: ThemeInput,
  Section: ThemeSection,
  Grid: ThemeGrid,
  IconContainer: ThemeIconContainer,
  config: THEME_CONFIG,
  utils: {
    getStaggerDelay,
    getStaggerDelayClass,
  }
};
