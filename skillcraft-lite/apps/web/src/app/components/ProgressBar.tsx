import React from 'react';
import { transitions } from '../utils/animations';

interface ProgressBarProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  color?: 'indigo' | 'green' | 'blue' | 'purple';
  animate?: boolean;
}

export default function ProgressBar({
  progress,
  size = 'md',
  showLabel = true,
  label,
  color = 'indigo',
  animate = true,
}: ProgressBarProps) {
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colors = {
    indigo: 'bg-indigo-600',
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">{label}</span>
          <span className="text-gray-900 dark:text-white">{progress}%</span>
        </div>
      )}
      <div className={`overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${sizes[size]}`}>
        <div
          className={`${colors[color]} ${transitions.default} ${animate ? 'animate-scale-in' : ''}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
} 