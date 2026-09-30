import React from 'react';
import { Skeleton } from './Skeleton';

export interface SkeletonAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'rounded';
  className?: string;
}

const sizeMap: Record<string, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  '2xl': 'w-24 h-24',
};

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 'md',
  shape = 'circle',
  className = '',
}) => {
  const sizeClass = sizeMap[size] || 'w-10 h-10';
  const roundedClass = shape === 'circle' ? 'full' : '2xl';

  return (
    <Skeleton
      rounded={roundedClass}
      className={`shrink-0 ${sizeClass} ${className}`}
      aria-hidden="true"
    />
  );
};
