import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'default' | 'shimmer' | 'pulse' | 'glass';
  color?: 'default' | 'cyan' | 'purple' | 'amber' | 'emerald';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  aspectRatio?: '16/9' | '9/16' | '1/1' | '4/5' | '21/9' | '2.35/1' | 'auto';
  width?: string | number;
  height?: string | number;
}

const roundedMap: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
};

const aspectMap: Record<string, string> = {
  '16/9': 'aspect-video',
  '9/16': 'aspect-[9/16]',
  '1/1': 'aspect-square',
  '4/5': 'aspect-[4/5]',
  '21/9': 'aspect-[21/9]',
  '2.35/1': 'aspect-[2.35/1]',
  auto: '',
};

const colorClasses: Record<string, string> = {
  default: '',
  cyan: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300',
  purple: 'bg-purple-500/15 border-purple-400/30 text-purple-300',
  amber: 'bg-amber-500/15 border-amber-400/30 text-amber-300',
  emerald: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300',
};

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'shimmer',
  color = 'default',
  rounded = 'md',
  aspectRatio = 'auto',
  width,
  height,
  style,
  ...props
}) => {
  const roundedClass = roundedMap[rounded] || 'rounded-md';
  const aspectClass = aspectMap[aspectRatio] || '';
  const colorClass = colorClasses[color] || '';

  const variantClasses = {
    default: 'bg-white/[0.09] border border-white/[0.08]',
    pulse: 'bg-white/[0.09] border border-white/[0.08] animate-skeleton-pulse',
    shimmer: 'skeleton-base skeleton-shimmer-effect',
    glass: 'bg-white/[0.07] backdrop-blur-xl border border-white/12 skeleton-shimmer-effect',
  }[variant];

  const inlineStyles: React.CSSProperties = {
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...style,
  };

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading..."
      className={`${variantClasses} ${roundedClass} ${aspectClass} ${colorClass} ${className}`}
      style={inlineStyles}
      {...props}
    />
  );
};
