import { ReactNode, HTMLAttributes } from 'react';

interface AnimatedHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  animation?: 'shimmer' | 'gradient-sweep' | 'typewriter' | 'glitch' | 'wave' | 'fade-scale' | 'slide-left' | 'slide-right' | 'none';
  glitchText?: string;
}

export function AnimatedHeading({
  children,
  as: Tag = 'h2',
  animation = 'shimmer',
  glitchText,
  className = '',
  ...props
}: AnimatedHeadingProps) {
  const animationClass = animation !== 'none' ? `heading-${animation}` : '';

  if (animation === 'glitch') {
    return (
      <Tag 
        className={`${animationClass} ${className}`}
        data-text={glitchText || children}
        {...props}
      >
        {children}
      </Tag>
    );
  }

  if (animation === 'wave') {
    const text = typeof children === 'string' ? children : String(children);
    return (
      <Tag className={`${animationClass} ${className}`} {...props}>
        {text.split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={`${animationClass} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
