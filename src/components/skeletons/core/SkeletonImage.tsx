import React from 'react';
import { Skeleton } from './Skeleton';
import { Film, Image as ImageIcon } from 'lucide-react';

export interface SkeletonImageProps {
  aspectRatio?: '16/9' | '9/16' | '1/1' | '4/5' | '21/9' | '2.35/1' | 'auto';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  className?: string;
  showIcon?: boolean;
  iconType?: 'film' | 'image';
}

export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  aspectRatio = '16/9',
  rounded = '2xl',
  className = '',
  showIcon = true,
  iconType = 'film',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Skeleton
        aspectRatio={aspectRatio}
        rounded={rounded}
        className="w-full h-full"
      />
      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-neutral-400">
          {iconType === 'film' ? (
            <Film className="w-8 h-8 sm:w-10 sm:h-10" />
          ) : (
            <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          )}
        </div>
      )}
    </div>
  );
};
