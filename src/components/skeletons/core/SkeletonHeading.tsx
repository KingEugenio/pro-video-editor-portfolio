import React from 'react';
import { Skeleton } from './Skeleton';

export interface SkeletonHeadingProps {
  level?: 1 | 2 | 3 | 4;
  className?: string;
  width?: string;
  subheading?: boolean;
}

const headingHeights: Record<number, string> = {
  1: 'h-10 sm:h-14 md:h-16',
  2: 'h-8 sm:h-10 md:h-12',
  3: 'h-6 sm:h-8',
  4: 'h-5 sm:h-6',
};

export const SkeletonHeading: React.FC<SkeletonHeadingProps> = ({
  level = 2,
  className = '',
  width = 'w-3/4 max-w-lg',
  subheading = false,
}) => {
  const heightClass = headingHeights[level] || 'h-8';

  return (
    <div className={`space-y-3 ${className}`} aria-hidden="true">
      <Skeleton rounded="lg" className={`${heightClass} ${width}`} />
      {subheading && (
        <Skeleton rounded="md" className="h-4 w-1/2 max-w-sm opacity-60" />
      )}
    </div>
  );
};
