import React from 'react';
import { Skeleton } from './Skeleton';
import { Play } from 'lucide-react';

export interface SkeletonVideoProps {
  aspectRatio?: '16/9' | '9/16' | '1/1' | '4/5' | '21/9' | '2.35/1';
  orientation?: 'landscape' | 'portrait';
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  showControls?: boolean;
}

export const SkeletonVideo: React.FC<SkeletonVideoProps> = ({
  aspectRatio = '16/9',
  orientation = 'landscape',
  className = '',
  rounded = '2xl',
  showControls = true,
}) => {
  const finalAspect = orientation === 'portrait' ? '9/16' : aspectRatio;
  const containerAspect =
    finalAspect === '9/16'
      ? 'aspect-[9/16] max-w-[340px] md:max-w-[380px] mx-auto'
      : finalAspect === '1/1'
      ? 'aspect-square max-w-[480px] mx-auto'
      : finalAspect === '4/5'
      ? 'aspect-[4/5] max-w-[420px] mx-auto'
      : finalAspect === '21/9' || finalAspect === '2.35/1'
      ? 'aspect-[2.35/1] w-full'
      : 'aspect-video w-full';

  return (
    <div
      className={`relative overflow-hidden bg-[#0a0a0f] border border-white/10 ${containerAspect} ${
        rounded === '2xl' ? 'rounded-2xl' : rounded === '3xl' ? 'rounded-3xl' : 'rounded-xl'
      } ${className}`}
      aria-hidden="true"
    >
      {/* Background Shimmer */}
      <Skeleton className="absolute inset-0 w-full h-full" rounded="none" />

      {/* Top badges placeholder */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
        <Skeleton rounded="full" className="h-6 w-24 bg-white/10" />
        <Skeleton rounded="full" className="h-6 w-16 bg-white/10" />
      </div>

      {/* Center Cinematic Play Button Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-md">
          <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white/30 fill-white/20 ml-1" />
        </div>
      </div>

      {/* Bottom Video Controls Bar Placeholder */}
      {showControls && (
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 space-y-2">
          {/* Progress scrubber line */}
          <Skeleton rounded="full" className="h-1.5 w-full bg-white/15" />
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <Skeleton rounded="full" className="w-6 h-6 bg-white/15" />
              <Skeleton rounded="md" className="h-4 w-16 bg-white/15" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton rounded="full" className="w-6 h-6 bg-white/15" />
              <Skeleton rounded="full" className="w-6 h-6 bg-white/15" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
