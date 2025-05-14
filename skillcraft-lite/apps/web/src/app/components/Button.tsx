import React from 'react';
import { transitions } from '../utils/animations';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 shadow-card';
  
  const variants = {
    primary: 'bg-primary text-white hover:scale-105 hover:shadow-glow focus:ring-primary',
    secondary: 'bg-background-surface text-text-secondary border border-border hover:bg-background-card hover:scale-105 focus:ring-accent-blue',
    outline: 'border border-border bg-transparent text-text-secondary hover:bg-background-card hover:scale-105 focus:ring-accent-blue',
    ghost: 'bg-transparent text-text-muted hover:bg-background-card hover:scale-105 focus:ring-accent-blue',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${transitions.default}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
} 