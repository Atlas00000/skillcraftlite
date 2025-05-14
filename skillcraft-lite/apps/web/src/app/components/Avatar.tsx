import React from 'react';
import { transitions } from '../utils/animations';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
  animate?: boolean;
}

export default function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  status,
  className = '',
  animate = true,
}: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const statusSizes = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  };

  return (
    <div className="relative inline-block">
      <img
        src={src || `https://ui-avatars.com/api/?name=${alt}&background=6366f1&color=fff`}
        alt={alt}
        className={`
          rounded-full object-cover
          ${sizes[size]}
          ${transitions.default}
          ${animate ? 'animate-scale-in' : ''}
          ${className}
        `}
      />
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-800
            ${statusColors[status]}
            ${statusSizes[size]}
            ${transitions.default}
          `}
        />
      )}
    </div>
  );
} 