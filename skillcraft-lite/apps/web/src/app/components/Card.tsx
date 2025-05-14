import React from 'react';
import { transitions, hoverEffects } from '../utils/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: 'lift' | 'scale' | 'glow' | 'border' | 'none';
  animate?: boolean;
}

export default function Card({ children, className = '', hover = 'lift', animate = true }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border subtle-card-bg p-6 shadow-card transition-all duration-150 focus-within:ring-2 focus-within:ring-accent-blue
      ${hover !== 'none' ? 'hover:scale-105 hover:shadow-glow' : ''}
      ${animate ? 'animate-scale-in' : ''}
      ${className}`}
      style={{ background: 'rgba(35, 35, 74, 0.85)', backdropFilter: 'blur(4px)', borderColor: '#23234a' }}
    >
      {children}
    </div>
  );
} 