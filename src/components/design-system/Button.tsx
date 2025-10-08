import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'motion/react';

/**
 * CENTRALIZED BUTTON SYSTEM
 * Unified design system with strict black & white theme
 * All variants follow consistent typography, spacing, and hover states
 */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  animate?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      fullWidth = false,
      animate = true,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    // Base styles - consistent across all variants
    const baseStyles = `
      font-raleway font-semibold
      inline-flex items-center justify-center gap-2
      transition-all duration-400 ease-out
      cursor-pointer
      disabled:opacity-50 disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
    `.trim();

    // Variant styles - strict black & white theme
    const variantStyles = {
      primary: `
        bg-black text-white
        border-none
        shadow-[0_2px_8px_rgba(0,0,0,0.15),0_4px_16px_rgba(0,0,0,0.1)]
        hover:bg-[#404040]
        hover:shadow-[0_4px_16px_rgba(0,0,0,0.25),0_8px_32px_rgba(0,0,0,0.15)]
        hover:-translate-y-0.5
        active:translate-y-0
      `,
      secondary: `
        bg-[#404040] text-white
        border-none
        shadow-[0_2px_8px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08)]
        hover:bg-[#525252]
        hover:shadow-[0_4px_16px_rgba(0,0,0,0.2),0_8px_32px_rgba(0,0,0,0.12)]
        hover:-translate-y-0.5
        active:translate-y-0
      `,
      outline: `
        bg-transparent text-black
        border-2 border-black
        hover:bg-black hover:text-white
        hover:shadow-[0_4px_16px_rgba(0,0,0,0.25),0_8px_32px_rgba(0,0,0,0.15)]
        hover:-translate-y-0.5
        active:translate-y-0
      `,
      text: `
        bg-transparent text-black
        border-none
        hover:text-[#404040]
        hover:underline underline-offset-4
      `
    };

    // Size styles - consistent padding and text sizes
    const sizeStyles = {
      sm: 'px-4 py-2 text-[0.813rem] rounded-[10px]',
      md: 'px-6 py-3 text-[0.875rem] rounded-[10px]',
      lg: 'px-8 py-4 text-[1rem] rounded-[10px]'
    };

    const combinedClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `.replace(/\s+/g, ' ').trim();

    const ButtonContent = () => (
      <>
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </>
    );

    if (animate) {
      return (
        <motion.button
          ref={ref}
          className={combinedClassName}
          whileHover={{ scale: variant !== 'text' ? 1.02 : 1 }}
          whileTap={{ scale: variant !== 'text' ? 0.98 : 1 }}
          {...props}
        >
          <ButtonContent />
        </motion.button>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        <ButtonContent />
      </button>
    );
  }
);

Button.displayName = 'Button';