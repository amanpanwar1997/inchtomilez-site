import { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

/**
 * Responsive container component with consistent padding and max-width
 * Ensures proper spacing on all devices
 */
export function ResponsiveContainer({ 
  children, 
  className = '',
  size = 'default'
}: ResponsiveContainerProps) {
  const sizeClasses = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-screen-2xl',
    full: 'max-w-full'
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`}>
      {children}
    </div>
  );
}

interface ResponsiveSectionProps {
  children: ReactNode;
  className?: string;
  spacing?: 'default' | 'sm' | 'lg' | 'none';
  background?: 'white' | 'gray' | 'transparent';
}

/**
 * Responsive section component with consistent vertical spacing
 */
export function ResponsiveSection({
  children,
  className = '',
  spacing = 'default',
  background = 'transparent'
}: ResponsiveSectionProps) {
  const spacingClasses = {
    none: '',
    sm: 'py-12 sm:py-16 lg:py-20',
    default: 'py-16 sm:py-20 lg:py-24 xl:py-28',
    lg: 'py-20 sm:py-28 lg:py-32 xl:py-40'
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    transparent: 'bg-transparent'
  };

  return (
    <section className={`${spacingClasses[spacing]} ${backgroundClasses[background]} ${className}`}>
      {children}
    </section>
  );
}

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}

/**
 * Responsive grid that adapts to screen size
 */
export function ResponsiveGrid({
  children,
  cols = 3,
  className = '',
  gap = 'md'
}: ResponsiveGridProps) {
  const colClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  const gapClasses = {
    sm: 'gap-4 sm:gap-5',
    md: 'gap-4 sm:gap-6 lg:gap-8',
    lg: 'gap-6 sm:gap-8 lg:gap-10'
  };

  return (
    <div className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

interface ResponsiveFlexProps {
  children: ReactNode;
  direction?: 'row' | 'col';
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}

/**
 * Responsive flex container
 */
export function ResponsiveFlex({
  children,
  direction = 'row',
  className = '',
  gap = 'md',
  align = 'start',
  justify = 'start'
}: ResponsiveFlexProps) {
  const directionClasses = {
    row: 'flex-col sm:flex-row',
    col: 'flex-col'
  };

  const gapClasses = {
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around'
  };

  return (
    <div className={`flex ${directionClasses[direction]} ${gapClasses[gap]} ${alignClasses[align]} ${justifyClasses[justify]} ${className}`}>
      {children}
    </div>
  );
}

interface ResponsiveTextProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  className?: string;
  as?: 'p' | 'span' | 'div';
}

/**
 * Responsive text component with proper sizing
 */
export function ResponsiveText({
  children,
  size = 'base',
  className = '',
  as: Component = 'p'
}: ResponsiveTextProps) {
  const sizeClasses = {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl lg:text-2xl',
    xl: 'text-xl sm:text-2xl lg:text-3xl',
    '2xl': 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl'
  };

  return (
    <Component className={`${sizeClasses[size]} ${className}`}>
      {children}
    </Component>
  );
}
