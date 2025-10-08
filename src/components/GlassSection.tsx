import { ReactNode } from 'react';
import { ParallaxSection } from './ParallaxSection';

interface GlassSectionProps {
  children: ReactNode;
  variant?: 'light' | 'medium' | 'heavy' | 'ultra' | 'none';
  parallax?: boolean;
  parallaxSpeed?: number;
  className?: string;
}

export function GlassSection({ 
  children, 
  variant = 'light',
  parallax = true,
  parallaxSpeed = 0.3,
  className = '' 
}: GlassSectionProps) {
  const variantClass = {
    'none': 'bg-white',
    'light': 'section-glass-light',
    'medium': 'glass-overlay',
    'heavy': 'section-glass-heavy',
    'ultra': 'glass-ultra'
  }[variant];

  const content = (
    <section className={`section-compact-lg ${variantClass} ${className}`}>
      {children}
    </section>
  );

  if (parallax) {
    return (
      <ParallaxSection speed={parallaxSpeed} opacity>
        {content}
      </ParallaxSection>
    );
  }

  return content;
}

// Specific section variants for consistency
export function GlassSectionAlternating({ 
  children, 
  index,
  className = '' 
}: { 
  children: ReactNode; 
  index: number;
  className?: string;
}) {
  const variant = index % 2 === 0 ? 'light' : 'none';
  
  return (
    <GlassSection 
      variant={variant as any} 
      parallax 
      parallaxSpeed={0.2 + (index * 0.05)}
      className={className}
    >
      {children}
    </GlassSection>
  );
}
