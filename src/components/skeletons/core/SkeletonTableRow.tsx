import React from 'react';
import { Skeleton } from './Skeleton';

export interface SkeletonTableRowProps {
  columns?: number;
  className?: string;
  avatarCol?: boolean;
}

export const SkeletonTableRow: React.FC<SkeletonTableRowProps> = ({
  columns = 5,
  className = '',
  avatarCol = true,
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.01] ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {avatarCol && (
          <Skeleton rounded="xl" className="w-14 h-9 shrink-0 bg-white/10" />
        )}
        <div className="space-y-1.5 flex-1 min-w-0">
          <Skeleton rounded="md" className="h-4 w-48 max-w-full" />
          <Skeleton rounded="sm" className="h-3 w-28 opacity-60" />
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-8 px-4">
        <Skeleton rounded="full" className="h-5 w-20" />
        <Skeleton rounded="md" className="h-3.5 w-16 opacity-60" />
        <Skeleton rounded="full" className="h-5 w-16" />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton rounded="lg" className="w-7 h-7" />
        <Skeleton rounded="lg" className="w-7 h-7" />
      </div>
    </div>
  );
};
