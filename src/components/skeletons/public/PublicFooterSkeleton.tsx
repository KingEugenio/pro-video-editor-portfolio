import React from 'react';
import { Skeleton } from '../core';
import { Film } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, YouTubeIcon, TwitterXIcon, LinkedInIcon } from '../../icons/CustomSvgIcons';

export const PublicFooterSkeleton: React.FC = () => {
  return (
    <footer className="border-t border-white/8 bg-[#050508]/95 backdrop-blur-xl pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Footer Loading">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <Film className="w-4 h-4" />
              </div>
              <Skeleton rounded="md" className="h-6 w-36" />
            </div>
            <Skeleton rounded="sm" className="h-3.5 w-64 opacity-60" />
          </div>

          {/* Quick Links Navigation Placeholders */}
          <div className="flex flex-wrap items-center gap-6">
            <Skeleton rounded="md" className="h-4 w-24" />
            <Skeleton rounded="md" className="h-4 w-28" />
            <Skeleton rounded="md" className="h-4 w-24" />
            <Skeleton rounded="md" className="h-4 w-24" />
            <Skeleton rounded="md" className="h-4 w-24" />
          </div>

          {/* Configured Social Icons with Real SVGs */}
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 text-neutral-500">
              <InstagramIcon className="w-4 h-4" />
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 text-neutral-500">
              <YouTubeIcon className="w-4 h-4" />
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 text-neutral-500">
              <TwitterXIcon className="w-4 h-4" />
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 text-neutral-500">
              <LinkedInIcon className="w-4 h-4" />
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-400/60">
              <WhatsAppIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Bottom Tier & Attribution */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Skeleton rounded="sm" className="h-3.5 w-72 opacity-50" />
          <Skeleton rounded="sm" className="h-3.5 w-48 opacity-60 bg-cyan-500/10 border border-cyan-500/20" />
        </div>
      </div>
    </footer>
  );
};
