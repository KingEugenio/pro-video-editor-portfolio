import React from 'react';
import { Skeleton } from './Skeleton';

export interface SkeletonButtonProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'pill' | 'rounded';
  primary?: boolean;
  className?: string;
  width?: string;
  children?: React.ReactNode;
}

const sizeClasses: Record<string, string> = {
  sm: 'h-8 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-base',
};

export const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  size = 'md',
  variant = 'pill',
  primary = false,
  className = '',
  width = 'w-32',
  children,
}) => {
  const sizeClass = sizeClasses[size] || 'h-11 px-6';
  const radius = variant === 'pill' ? 'full' : 'xl';

  const primaryStyles = primary
    ? 'bg-cyan-500/25 border border-cyan-400/40 shadow-lg shadow-cyan-950/40'
    : 'bg-white/[0.09] border border-white/10';

  return (
    <Skeleton
      rounded={radius}
      className={`inline-flex items-center justify-center ${sizeClass} ${primaryStyles} ${width} ${className}`}
      aria-hidden="true"
    >
      {children}
    </Skeleton>
  );
};
