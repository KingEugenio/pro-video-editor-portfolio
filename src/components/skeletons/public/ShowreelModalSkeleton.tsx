import React from 'react';
import { Skeleton, SkeletonVideo } from '../core';

export interface ShowreelModalSkeletonProps {
  onClose?: () => void;
}

export const ShowreelModalSkeleton: React.FC<ShowreelModalSkeletonProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
      aria-label="Showreel Loading"
    >
      {/* Close button */}
      <div className="absolute top-6 right-6 z-50">
        {onClose ? (
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <Skeleton rounded="full" className="w-12 h-12 bg-white/10" />
        )}
      </div>

      <div className="w-full max-w-5xl space-y-4">
        {/* Header Title */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Skeleton rounded="full" className="w-4 h-4 bg-cyan-400/40" />
            <Skeleton rounded="sm" className="h-4 w-60" />
          </div>
          <Skeleton rounded="sm" className="h-3 w-40 opacity-50 hidden sm:block" />
        </div>

        {/* 16:9 Video Canvas Frame */}
        <div className="rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl p-1">
          <SkeletonVideo aspectRatio="16/9" rounded="xl" />
        </div>
      </div>
    </div>
  );
};
