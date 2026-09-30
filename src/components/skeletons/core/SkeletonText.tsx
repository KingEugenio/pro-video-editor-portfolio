import React from 'react';
import { Skeleton } from './Skeleton';

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineClassName?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg';
  lastLineWidth?: string;
  gap?: 'sm' | 'md' | 'lg';
}

const sizeHeights: Record<string, string> = {
  xs: 'h-3',
  sm: 'h-3.5',
  base: 'h-4',
  lg: 'h-5',
};

const gapClasses: Record<string, string> = {
  sm: 'space-y-1.5',
  md: 'space-y-2.5',
  lg: 'space-y-3.5',
};

const defaultWidths = ['w-full', 'w-[92%]', 'w-[96%]', 'w-[88%]', 'w-[75%]'];

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = '',
  lineClassName = '',
  size = 'base',
  lastLineWidth = 'w-3/5',
  gap = 'md',
}) => {
  const heightClass = sizeHeights[size] || 'h-4';
  const spacingClass = gapClasses[gap] || 'space-y-2.5';

  return (
    <div className={`w-full ${spacingClass} ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => {
        const isLast = index === lines - 1;
        const widthClass = isLast && lines > 1 ? lastLineWidth : defaultWidths[index % defaultWidths.length];
        return (
          <Skeleton
            key={index}
            rounded="md"
            className={`${heightClass} ${widthClass} ${lineClassName}`}
          />
        );
      })}
    </div>
  );
};
