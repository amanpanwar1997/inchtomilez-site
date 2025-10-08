import { HTMLAttributes, forwardRef } from 'react';

/**
 * CENTRALIZED SECTION SYSTEM
 * Unified grid system and spacing across all sections
 * 12-column grid with consistent paddings and margins
 */

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'compact' | 'medium' | 'large';
  glassEffect?: 'none' | 'light' | 'medium' | 'strong';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      spacing = 'medium',
      glassEffect = 'none',
      containerSize = 'lg',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Spacing utilities
    const spacingClasses = {
      compact: 'section-compact',
      medium: 'section-compact-md',
      large: 'section-compact-lg'
    };

    // Glass effect utilities
    const glassClasses = {
      none: '',
      light: 'glass-section-light',
      medium: 'glass-section-medium',
      strong: 'glass-section-strong'
    };

    return (
      <section
        ref={ref}
        className={`
          ${spacingClasses[spacing]}
          ${glassClasses[glassEffect]}
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      >
        <Container size={containerSize}>{children}</Container>
      </section>
    );
  }
);

Section.displayName = 'Section';

// Container Component
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', className = '', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[1400px]',
      full: 'max-w-full'
    };

    return (
      <div
        ref={ref}
        className={`
          ${sizeClasses[size]}
          mx-auto
          px-4 sm:px-6 lg:px-8
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

// Grid System Component
interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
  equalHeight?: boolean;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 3, gap = 'md', equalHeight = false, className = '', children, ...props }, ref) => {
    // Column classes
    const columnClasses = {
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
      12: 'grid-cols-12'
    };

    // Gap classes
    const gapClasses = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8'
    };

    return (
      <div
        ref={ref}
        className={`
          grid
          ${columnClasses[columns]}
          ${gapClasses[gap]}
          ${equalHeight ? 'auto-rows-fr' : ''}
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

// Card Component with Glass Effect
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'strong' | 'subtle' | 'shine';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'card', padding = 'md', hover = true, className = '', children, ...props }, ref) => {
    // Variant classes
    const variantClasses = {
      card: 'glass-card',
      strong: 'glass-strong',
      subtle: 'glass-subtle',
      shine: 'glass-shine'
    };

    // Padding classes
    const paddingClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    return (
      <div
        ref={ref}
        className={`
          ${variantClasses[variant]}
          ${paddingClasses[padding]}
          ${hover ? 'hover-lift-award' : ''}
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';