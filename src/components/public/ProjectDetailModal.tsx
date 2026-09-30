import React, { useState, useEffect } from 'react';
import { X, Play, Smartphone, Monitor, CheckCircle, ExternalLink, SlidersHorizontal, ArrowUpRight, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, VideoItem } from '../../types/portfolio';
import { VideoPlayer } from '../ui/VideoPlayer';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { usePortfolio } from '../../context/PortfolioContext';
import { KineticHeading } from '../ui/KineticHeading';
import { ProjectDetailModalSkeleton } from '../skeletons/public/ProjectDetailModalSkeleton';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onBookProject: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onBookProject,
}) => {
  const { brandTheme } = usePortfolio();
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'videos' | 'before_after'>('videos');
  const [isMediaLoading, setIsMediaLoading] = useState<boolean>(true);

  useEffect(() => {
    if (project) {
      setIsMediaLoading(true);
      setActiveVideoIndex(0);
      setActiveTab('videos');
      const timer = setTimeout(() => {
        setIsMediaLoading(false);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [project?.id]);

  if (!project) return null;

  if (isMediaLoading) {
    return <ProjectDetailModalSkeleton onClose={onClose} />;
  }

  const currentVideo: VideoItem = project.videos[activeVideoIndex] || project.videos[0];
  const hasBeforeAfter = Boolean(project.beforeVideo || project.afterVideo);

  return (
    <dialog
      open
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200 border-0 w-full h-full max-w-none max-h-none m-0"
    >
      {/* Background Aurora Aura */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25 blur-3xl z-0"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${brandTheme.colors.primary} 0%, ${brandTheme.colors.secondary} 50%, transparent 80%)`,
        }}
      />

      <article className="relative z-10 w-full max-w-5xl bg-[#0d0d12]/95 border border-white/12 rounded-2xl md:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto backdrop-blur-2xl">
        {/* Sticky Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0d0d12]/90 backdrop-blur-xl border-b border-white/8">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-medium text-cyan-300">
              {project.category}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              {project.client} • {project.year}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-8 max-h-[82vh] overflow-y-auto">
          {/* Main Title & Role */}
          <div className="space-y-2">
            <h1
              id="modal-project-title"
              className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight"
            >
              {project.title}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-cyan-400">
              Role: {project.role}
            </p>
          </div>

          {/* Video / Before-After Mode Tabs */}
          {hasBeforeAfter && (
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#08080c] border border-white/10 w-fit">
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase font-semibold transition-all cursor-pointer ${
                  activeTab === 'videos'
                    ? 'bg-cyan-500 text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                Video Deliverables ({project.videos.length})
              </button>
              <button
                onClick={() => setActiveTab('before_after')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase font-semibold transition-all cursor-pointer ${
                  activeTab === 'before_after'
                    ? 'bg-cyan-500 text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                RAW vs Grade Comparison
              </button>
            </div>
          )}

          {/* Media Player Showcase */}
          {activeTab === 'videos' ? (
            <div className="space-y-4">
              {/* Primary Video Container */}
              <div className="rounded-2xl overflow-hidden bg-black border border-white/10 p-1.5 shadow-2xl">
                <VideoPlayer
                  key={currentVideo.id || currentVideo.url}
                  video={currentVideo}
                  poster={currentVideo.thumbnail || project.thumbnail}
                  autoPlay={false}
                  showBadge={true}
                  className="w-full"
                />
              </div>

              {/* Multi-video Switcher Pills */}
              {project.videos.length > 1 && (
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
                    Deliverable Cuts & Formats:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {project.videos.map((vid, index) => {
                      const isSelected = activeVideoIndex === index;
                      const isVert = vid.orientation === 'portrait';
                      return (
                        <button
                          key={vid.id || index}
                          onClick={() => setActiveVideoIndex(index)}
                          className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-950/50 border-cyan-400 text-white shadow-lg'
                              : 'bg-[#08080c]/80 border-white/8 text-neutral-400 hover:border-white/20 hover:text-neutral-200'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                            {isVert ? <Smartphone className="w-4 h-4 text-cyan-300" /> : <Monitor className="w-4 h-4 text-cyan-300" />}
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold block truncate text-white font-heading">
                              {vid.title}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400">
                              {isVert ? '9:16 Vertical' : '16:9 Landscape'} • {vid.type || 'Master'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Interactive Before/After Split Comparison */
            <div className="space-y-4">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80"
                afterImage="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
                beforeLabel="RAW LOG Footage"
                afterLabel="Final ACES Color Grade"
                className="w-full rounded-2xl overflow-hidden border border-white/10"
              />
            </div>
          )}

          {/* Project Details Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#08080c]/80 border border-white/8">
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">Client</span>
              <span className="text-sm font-bold text-white font-mono">{project.client}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">Year</span>
              <span className="text-sm font-bold text-white font-mono">{project.year}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">Category</span>
              <span className="text-sm font-bold text-cyan-300 font-mono">{project.category}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">Role</span>
              <span className="text-sm font-bold text-white font-mono">{project.role}</span>
            </div>
          </div>

          {/* Creative Narrative / Story */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white font-heading">Creative Approach & Post Breakdown</h3>
            <p className="text-sm text-neutral-300 font-body leading-relaxed">
              {project.brief ||
                'Crafted with a focus on seamless rhythmic pacing, custom cinematic audio Foley design, and meticulous color science matching.'}
            </p>
            {project.resultStory && (
              <p className="text-sm text-neutral-400 font-body leading-relaxed pt-2">
                {project.resultStory}
              </p>
            )}
          </div>

          {/* Services & Software Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                Services Provided:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.services.map((srv) => (
                  <span key={srv} className="px-3 py-1 rounded-lg bg-white/5 border border-white/8 text-xs text-neutral-200">
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                Software & Plugins:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.software.map((soft) => (
                  <span key={soft} className="px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-300 font-mono">
                    {soft}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400">
              Need a similar editorial cut or color pass for your project?
            </div>
            <button
              onClick={() => {
                onClose();
                onBookProject();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full font-button font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:scale-105 transition-all"
              style={{
                backgroundColor: brandTheme.colors.button || brandTheme.colors.primary,
                color: brandTheme.colors.buttonText || '#000',
              }}
            >
              Start Similar Project
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>
    </dialog>
  );
};
