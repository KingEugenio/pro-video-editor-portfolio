import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonButton, SkeletonInput, SkeletonText } from '../core';

export const OnboardingWizardSkeleton: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 space-y-8" aria-label="Wizard Loading">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton rounded="full" className="w-3.5 h-3.5 bg-cyan-400" />
            <Skeleton rounded="sm" className="h-3.5 w-28" />
          </div>
          <Skeleton rounded="sm" className="h-3.5 w-24 opacity-60" />
        </div>
        <Skeleton rounded="full" className="h-2 w-full bg-white/10" />
      </div>

      {/* Main Wizard Card */}
      <SkeletonCard rounded="3xl" padding="lg" className="space-y-6">
        <div className="space-y-3">
          <SkeletonHeading level={2} width="w-4/5" />
          <SkeletonText lines={2} size="sm" />
        </div>

        {/* Form Inputs or Options */}
        <div className="space-y-3 pt-2">
          <Skeleton rounded="sm" className="h-3 w-32 opacity-70" />
          <SkeletonInput rounded="xl" className="h-12" />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <SkeletonButton size="md" variant="rounded" width="w-24" />
          <SkeletonButton size="md" variant="rounded" width="w-32" className="bg-cyan-500/20" />
        </div>
      </SkeletonCard>
    </div>
  );
};
