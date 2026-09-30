import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonText, SkeletonCard, SkeletonInput, SkeletonButton } from '../core';
import { WhatsAppIcon } from '../../icons/CustomSvgIcons';

export const ContactBookingSectionSkeleton: React.FC = () => {
  return (
    <section id="contact-skeleton" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="Contact Loading">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Contact info & Perks */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116]/80 border border-white/10">
              <Skeleton rounded="full" className="w-3.5 h-3.5 bg-cyan-400" />
              <Skeleton rounded="sm" className="h-3 w-36 opacity-80" />
            </div>
            <SkeletonHeading level={2} width="w-full max-w-md" />
            <SkeletonText lines={3} size="base" />
          </div>

          {/* Quick Perks */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <Skeleton rounded="full" className="w-4 h-4 bg-cyan-400/30 shrink-0" />
              <Skeleton rounded="sm" className="h-3.5 w-72 max-w-full" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton rounded="full" className="w-4 h-4 bg-cyan-400/30 shrink-0" />
              <Skeleton rounded="sm" className="h-3.5 w-80 max-w-full" />
            </div>
          </div>

          {/* Direct WhatsApp Channel Button */}
          <div className="pt-6 border-t border-white/10 space-y-2">
            <Skeleton rounded="sm" className="h-3 w-28 opacity-50 uppercase tracking-widest" />
            <div className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 w-full sm:w-64">
              <WhatsAppIcon className="w-4 h-4 text-emerald-400/60 shrink-0" />
              <Skeleton rounded="sm" className="h-3.5 w-32 bg-emerald-400/20" />
            </div>
          </div>
        </div>

        {/* Right Column: Dark Glass Booking Brief Form */}
        <div className="lg:col-span-7">
          <SkeletonCard rounded="3xl" padding="lg" className="space-y-6 bg-[#0e0e14]/90 border border-white/10">
            {/* Form Header */}
            <div className="border-b border-white/10 pb-4 space-y-1">
              <Skeleton rounded="md" className="h-5 w-48" />
              <Skeleton rounded="sm" className="h-3 w-72 opacity-60" />
            </div>

            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkeletonInput labelWidth="w-20" />
              <SkeletonInput labelWidth="w-24" />
            </div>

            {/* Project Category Selection Pills */}
            <div className="space-y-2.5">
              <Skeleton rounded="sm" className="h-3 w-32 opacity-70" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} rounded="xl" className="h-9 w-28 bg-white/[0.08] border border-white/10" />
                ))}
              </div>
            </div>

            {/* Timeline & Budget / Scope */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkeletonInput labelWidth="w-32" />
              <SkeletonInput labelWidth="w-28" />
            </div>

            {/* Detailed Vision & RAW Footage Links (textarea) */}
            <SkeletonInput type="textarea" labelWidth="w-44" className="h-28" />

            {/* Submit Action */}
            <div className="pt-2">
              <SkeletonButton size="lg" variant="pill" primary width="w-full" className="h-12" />
            </div>
          </SkeletonCard>
        </div>

      </div>
    </section>
  );
};
