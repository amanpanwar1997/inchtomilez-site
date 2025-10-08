import { HTMLAttributes, forwardRef } from 'react';

/**
 * CENTRALIZED TYPOGRAPHY SYSTEM
 * Enforces strict Antonio + Raleway hierarchy
 * Headings: Antonio (Bold/Semi-Bold) - BLACK ONLY
 * Body: Raleway (Regular/Semi-Bold) - GREY ONLY
 */

// Heading Components
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'xl' | 'lg' | 'md' | 'sm';
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Component = 'h2', variant, className = '', children, ...props }, ref) => {
    // Map variants to utility classes
    const variantClasses = {
      xl: 'heading-xl',
      lg: 'heading-lg',
      md: 'heading-md',
      sm: 'heading-sm'
    };

    const classes = variant ? variantClasses[variant] : '';

    return (
      <Component ref={ref as any} className={`${classes} ${className}`.trim()} {...props}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

// Subheading Component
interface SubheadingProps extends HTMLAttributes<HTMLParagraphElement> {}

export const Subheading = forwardRef<HTMLParagraphElement, SubheadingProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <p ref={ref} className={`subheading ${className}`.trim()} {...props}>
        {children}
      </p>
    );
  }
);

Subheading.displayName = 'Subheading';

// Body Text Components
interface BodyTextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: 'lg' | 'md' | 'sm' | 'xs';
}

export const BodyText = forwardRef<HTMLParagraphElement, BodyTextProps>(
  ({ variant = 'md', className = '', children, ...props }, ref) => {
    const variantClasses = {
      lg: 'body-lg',
      md: 'body-md',
      sm: 'body-sm',
      xs: 'body-xs'
    };

    return (
      <p ref={ref} className={`${variantClasses[variant]} ${className}`.trim()} {...props}>
        {children}
      </p>
    );
  }
);

BodyText.displayName = 'BodyText';

// Label Component
interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`font-raleway text-[0.813rem] font-medium text-[#525252] ${className}`.trim()}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';