// components/CupertinoInput.tsx
import React, { forwardRef, useState, useCallback } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

interface CupertinoInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  success?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  required?: boolean;
}

const CupertinoInput = forwardRef<HTMLInputElement, CupertinoInputProps>(({
  label,
  error,
  helperText,
  success = false,
  size = 'md',
  variant = 'default',
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  type = 'text',
  className = '',
  placeholder,
  required = false,
  disabled = false,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(value));

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, [onFocus]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  }, [onBlur]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(Boolean(e.target.value));
    onChange?.(e);
  }, [onChange]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Size configurations
  const sizeConfig = {
    sm: {
      input: 'h-9 px-3 text-sm',
      label: 'text-sm',
      icon: 'w-4 h-4',
      spacing: 'gap-2'
    },
    md: {
      input: 'h-11 px-4 text-base',
      label: 'text-sm',
      icon: 'w-5 h-5',
      spacing: 'gap-3'
    },
    lg: {
      input: 'h-12 px-4 text-lg',
      label: 'text-base',
      icon: 'w-6 h-6',
      spacing: 'gap-4'
    }
  };

  const currentSize = sizeConfig[size];

  // Variant styles
  const variantStyles = {
    default: `
      bg-white border border-gray-200 
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
      ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
      ${success ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20' : ''}
    `,
    filled: `
      bg-gray-50 border border-transparent
      focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
      ${error ? 'bg-red-50 border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
      ${success ? 'bg-green-50 border-green-500 focus:border-green-500 focus:ring-green-500/20' : ''}
    `,
    outlined: `
      bg-transparent border-2 border-gray-300
      focus:border-blue-500 focus:ring-0
      ${error ? 'border-red-500 focus:border-red-500' : ''}
      ${success ? 'border-green-500 focus:border-green-500' : ''}
    `
  };

  const inputType = showPasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label 
          className={`
            block ${currentSize.label} font-medium text-gray-900 mb-2
            ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
          `}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
            letterSpacing: '-0.24px'
          }}
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className={`
            absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 ${currentSize.icon}
            ${isFocused ? 'text-blue-500' : ''}
            ${error ? 'text-red-500' : ''}
            ${success ? 'text-green-500' : ''}
          `}>
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full ${currentSize.input} rounded-xl
            transition-all duration-200 ease-out
            placeholder:text-gray-400
            disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
            ${variantStyles[variant]}
            ${leftIcon ? 'pl-10' : ''}
            ${(rightIcon || showPasswordToggle || error || success) ? 'pr-10' : ''}
            ${className}
          `}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
            WebkitAppearance: 'none',
            fontSize: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
            letterSpacing: '-0.24px',
            outline: 'none',
            boxShadow: isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none'
          }}
          {...props}
        />

        {/* Right Icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {/* Error Icon */}
          {error && (
            <AlertCircle className={`${currentSize.icon} text-red-500`} />
          )}

          {/* Success Icon */}
          {success && !error && (
            <Check className={`${currentSize.icon} text-green-500`} />
          )}

          {/* Password Toggle */}
          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={`
                ${currentSize.icon} text-gray-400 hover:text-gray-600
                transition-colors duration-200 focus:outline-none
              `}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          )}

          {/* Custom Right Icon */}
          {rightIcon && !error && !success && !showPasswordToggle && (
            <div className={`${currentSize.icon} text-gray-400`}>
              {rightIcon}
            </div>
          )}
        </div>
      </div>

      {/* Helper Text / Error Message */}
      {(error || helperText) && (
        <p 
          className={`
            mt-2 text-sm
            ${error ? 'text-red-500' : 'text-gray-600'}
          `}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
            fontSize: '13px',
            letterSpacing: '-0.08px'
          }}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

CupertinoInput.displayName = 'CupertinoInput';

export default CupertinoInput;