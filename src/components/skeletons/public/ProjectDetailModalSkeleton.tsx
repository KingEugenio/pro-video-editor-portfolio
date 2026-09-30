import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonText, SkeletonBadge, SkeletonVideo, SkeletonCard } from '../core';

export interface ProjectDetailModalSkeletonProps {
  onClose?: () => void;
}

export const ProjectDetailModalSkeleton: React.FC<ProjectDetailModalSkeletonProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-8" aria-label="Project Details Loading">
      <div className="relative w-full max-w-5xl bg-[#0b0b10] border border-white/10 rounded-3xl overflow-hidden shadow-2xl space-y-8 p-6 sm:p-8">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <SkeletonBadge width="w-24" className="bg-cyan-500/20" />
            <Skeleton rounded="full" className="h-6 w-16" />
          </div>
          {onClose ? (
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <Skeleton rounded="full" className="w-10 h-10 bg-white/10" />
          )}
        </div>

        {/* Cinematic Video Showcase */}
        <SkeletonVideo aspectRatio="16/9" rounded="2xl" className="shadow-2xl" />

        {/* Project Title & Metadata Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <SkeletonHeading level={1} width="w-3/4" />
            <SkeletonText lines={4} size="base" />
            <SkeletonText lines={3} size="base" lastLineWidth="w-2/3" />
          </div>

          {/* Sidebar Project Spec Meta Card */}
          <div className="lg:col-span-4">
            <SkeletonCard rounded="2xl" padding="md" className="space-y-4 bg-white/[0.02]">
              <div className="space-y-1">
                <Skeleton rounded="sm" className="h-3 w-16 opacity-60" />
                <Skeleton rounded="md" className="h-4 w-32" />
              </div>
              <div className="space-y-1">
                <Skeleton rounded="sm" className="h-3 w-16 opacity-60" />
                <Skeleton rounded="md" className="h-4 w-28" />
              </div>
              <div className="space-y-1">
                <Skeleton rounded="sm" className="h-3 w-16 opacity-60" />
                <Skeleton rounded="md" className="h-4 w-40" />
              </div>
              <div className="space-y-2 pt-2 border-t border-white/5">
                <Skeleton rounded="sm" className="h-3 w-24 opacity-60" />
                <div className="flex flex-wrap gap-1.5">
                  <Skeleton rounded="md" className="h-6 w-16" />
                  <Skeleton rounded="md" className="h-6 w-20" />
                  <Skeleton rounded="md" className="h-6 w-14" />
                </div>
              </div>
            </SkeletonCard>
          </div>
        </div>

        {/* Additional Multi-cut Media Gallery / Before-After Preview */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <Skeleton rounded="md" className="h-5 w-48" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Skeleton rounded="xl" aspectRatio="16/9" />
            <Skeleton rounded="xl" aspectRatio="16/9" />
            <Skeleton rounded="xl" aspectRatio="16/9" />
          </div>
        </div>

      </div>
    </div>
  );
};
