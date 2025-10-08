import { useEffect, useRef, ReactNode } from 'react';

interface ParallaxScrollProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ParallaxScroll({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '' 
}: ParallaxScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;

      // Only apply parallax when element is in viewport
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const parallaxOffset = (scrolled - elementTop) * speed;

        switch (direction) {
          case 'up':
            element.style.transform = `translateY(-${parallaxOffset}px)`;
            break;
          case 'down':
            element.style.transform = `translateY(${parallaxOffset}px)`;
            break;
          case 'left':
            element.style.transform = `translateX(-${parallaxOffset}px)`;
            break;
          case 'right':
            element.style.transform = `translateX(${parallaxOffset}px)`;
            break;
        }
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div 
      ref={elementRef} 
      className={`parallax-slow ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxLayer({ children, offset = 0.5, className = '' }: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xOffset = (clientX - innerWidth / 2) * offset;
      const yOffset = (clientY - innerHeight / 2) * offset;

      layer.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [offset]);

  return (
    <div 
      ref={layerRef} 
      className={`parallax-medium ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  glassEffect?: boolean;
}

export function ParallaxSection({ 
  children, 
  className = '',
  glassEffect = true 
}: ParallaxSectionProps) {
  return (
    <div className={`parallax-section-bg ${glassEffect ? 'section-glass-bg' : ''} ${className}`}>
      {children}
    </div>
  );
}
