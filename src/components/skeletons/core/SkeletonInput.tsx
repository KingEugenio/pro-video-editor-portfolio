import React from 'react';
import { Skeleton } from './Skeleton';

export interface SkeletonInputProps {
  label?: boolean;
  type?: 'input' | 'textarea' | 'select';
  className?: string;
  labelWidth?: string;
}

export const SkeletonInput: React.FC<SkeletonInputProps> = ({
  label = true,
  type = 'input',
  className = '',
  labelWidth = 'w-24',
}) => {
  return (
    <div className={`space-y-2 ${className}`} aria-hidden="true">
      {label && (
        <Skeleton rounded="sm" className={`h-3.5 ${labelWidth} opacity-70`} />
      )}
      {type === 'textarea' ? (
        <Skeleton rounded="xl" className="h-28 w-full bg-white/[0.04]" />
      ) : (
        <Skeleton rounded="xl" className="h-11 w-full bg-white/[0.04]" />
      )}
    </div>
  );
};
