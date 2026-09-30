import React from 'react';
import { Skeleton, SkeletonCard, SkeletonButton, SkeletonInput, SkeletonHeading, SkeletonText } from '../core';

export const AdminLoginSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center p-4 sm:p-6 text-neutral-100 relative overflow-hidden" aria-label="Admin Login Loading">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* Brand identity badge */}
        <div className="text-center space-y-3">
          <Skeleton rounded="2xl" className="w-14 h-14 mx-auto bg-cyan-500/20 shadow-2xl" />
          <SkeletonHeading level={1} width="w-48 mx-auto" />
          <Skeleton rounded="sm" className="h-3 w-64 mx-auto opacity-60" />
        </div>

        {/* Login Card */}
        <SkeletonCard rounded="3xl" padding="lg" className="space-y-6 bg-neutral-900/80 border border-white/10 shadow-2xl">
          {/* Header pill */}
          <div className="flex items-center gap-2 pb-4 border-b border-white/10">
            <Skeleton rounded="full" className="w-4 h-4 bg-cyan-400/40" />
            <Skeleton rounded="sm" className="h-3 w-48" />
          </div>

          {/* Form field */}
          <div className="space-y-2">
            <Skeleton rounded="sm" className="h-3 w-28 opacity-70" />
            <SkeletonInput rounded="xl" className="h-12" />
          </div>

          {/* Submit button */}
          <SkeletonButton size="lg" variant="rounded" width="w-full" className="bg-cyan-500/20 h-12" />

          {/* Bottom Security Info */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-2">
            <Skeleton rounded="full" className="w-3.5 h-3.5 opacity-60" />
            <Skeleton rounded="sm" className="h-3 w-48 opacity-60" />
          </div>
        </SkeletonCard>

        {/* Back Link */}
        <div className="flex justify-center">
          <Skeleton rounded="md" className="h-4 w-36 opacity-50" />
        </div>
      </div>
    </div>
  );
};
