import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
}

export function MicroButton({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  icon,
  className = '' 
}: ButtonProps) {
  const baseClasses = 'btn-award btn-ripple relative overflow-hidden';
  
  const sizeClasses = {
    sm: 'btn-sm-award',
    md: '',
    lg: 'btn-lg-award'
  };

  const variantClasses = {
    primary: 'btn-award',
    secondary: 'bg-gray-800 hover:bg-white',
    outline: 'btn-outline-award'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <motion.div
        className="flex items-center justify-center gap-2"
        whileHover={{ x: icon ? 2 : 0 }}
      >
        {children}
        {icon && (
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.span>
        )}
      </motion.div>

      {/* Ripple effect background */}
      <motion.span
        className="absolute inset-0 bg-white/30 rounded-lg"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
}

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function MicroCheckbox({ checked, onChange, label, className = '' }: CheckboxProps) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      <motion.div
        className="relative w-6 h-6 rounded-md border-2 border-gray-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          backgroundColor: checked ? '#1a1a1a' : 'transparent',
          borderColor: checked ? '#1a1a1a' : '#d4d4d4'
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="absolute opacity-0 w-0 h-0"
        />
        
        <motion.svg
          className="w-4 h-4 text-white"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: checked ? 1 : 0,
            opacity: checked ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
      
      {label && (
        <span className="body-sm text-gray-700 group-hover:text-black transition-colors">
          {label}
        </span>
      )}
    </label>
  );
}

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  icon?: ReactNode;
  className?: string;
}

export function MicroInput({ 
  value, 
  onChange, 
  placeholder, 
  error,
  type = 'text',
  icon,
  className = '' 
}: InputProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative"
        whileFocus={{ scale: 1.01 }}
      >
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <motion.input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`glass-input w-full px-4 py-3 ${icon ? 'pl-12' : ''} focus:outline-none transition-all`}
          whileFocus={{ 
            borderColor: '#1a1a1a',
            boxShadow: '0 0 0 3px rgba(26, 26, 26, 0.1)'
          }}
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="body-xs text-red-500 mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function MicroToast({ message, type = 'info', onClose }: ToastProps) {
  const icons = {
    success: (
      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="glass-premium p-4 rounded-lg shadow-dramatic flex items-center gap-3 min-w-[300px]"
      style={{ background: 'rgba(255, 255, 255, 0.95)' }}
    >
      {icons[type]}
      <p className="body-sm text-black flex-1">{message}</p>
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-400 hover:text-black transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>
    </motion.div>
  );
}

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export function MicroSkeleton({ width = '100%', height = '20px', className = '' }: SkeletonProps) {
  return (
    <motion.div
      className={`skeleton-loader ${className}`}
      style={{ width, height }}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
    />
  );
}
