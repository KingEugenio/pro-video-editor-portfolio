import React from 'react';
import { Skeleton } from './Skeleton';

export interface SkeletonBadgeProps {
  className?: string;
  width?: string;
  size?: 'sm' | 'md';
  color?: 'default' | 'cyan' | 'purple' | 'amber' | 'emerald';
  withDot?: boolean;
}

export const SkeletonBadge: React.FC<SkeletonBadgeProps> = ({
  className = '',
  width = 'w-20',
  size = 'md',
  color = 'default',
  withDot = false,
}) => {
  const height = size === 'sm' ? 'h-5' : 'h-6 sm:h-7';

  if (withDot) {
    const dotColors: Record<string, string> = {
      default: 'bg-white/60',
      cyan: 'bg-cyan-400',
      purple: 'bg-purple-400',
      amber: 'bg-amber-400',
      emerald: 'bg-emerald-400',
    };
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 ${className}`}
        aria-hidden="true"
      >
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[color] || dotColors.cyan}`} />
        <Skeleton rounded="sm" className="h-3 w-16" />
      </div>
    );
  }

  return (
    <Skeleton
      rounded="full"
      color={color}
      className={`inline-block ${height} ${width} ${className}`}
      aria-hidden="true"
    />
  );
};
