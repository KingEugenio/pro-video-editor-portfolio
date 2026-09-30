import React from 'react';
import { Skeleton } from './Skeleton';

export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  rounded?: 'lg' | 'xl' | '2xl' | '3xl';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  children?: React.ReactNode;
}

const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
  xl: 'p-8 sm:p-10',
};

const roundedClasses: Record<string, string> = {
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
};

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = '',
  rounded = '2xl',
  padding = 'md',
  children,
  ...props
}) => {
  const pad = paddingClasses[padding] || 'p-6';
  const rad = roundedClasses[rounded] || 'rounded-2xl';

  return (
    <div
      role="status"
      aria-busy="true"
      className={`bg-[#0e0e14]/85 border border-white/8 backdrop-blur-xl shadow-xl ${rad} ${pad} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
