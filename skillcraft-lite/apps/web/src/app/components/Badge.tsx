import React from 'react';
import { transitions } from '../utils/animations';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  animate = true,
}: BadgeProps) {
  const variants = {
    primary: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-semibold
        ${variants[variant]}
        ${sizes[size]}
        ${transitions.default}
        ${animate ? 'animate-scale-in' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  );
} 