import React, { useState, useEffect } from 'react';
import { X, Film } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { VideoPlayer } from '../ui/VideoPlayer';
import { ShowreelModalSkeleton } from '../skeletons/public/ShowreelModalSkeleton';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const { brandTheme } = usePortfolio();
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsBuffering(true);
      const timer = setTimeout(() => {
        setIsBuffering(false);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  if (isBuffering) {
    return <ShowreelModalSkeleton onClose={onClose} />;
  }

  const showreelVideo = {
    id: 'modal-showreel',
    title: `${brandTheme.brandName} - Official 2026 Master Showreel`,
    url: brandTheme.heroVideoUrl,
    provider: brandTheme.heroVideoType,
    orientation: 'landscape' as const,
    aspectRatio: '16:9',
    thumbnail: brandTheme.heroPosterUrl,
  };

  return (
    <dialog
      open
      role="dialog"
      aria-modal="true"
      aria-labelledby="showreel-modal-title"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300 border-0 w-full h-full max-w-none max-h-none m-0"
    >
      <button
        onClick={onClose}
        aria-label="Close showreel modal"
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full max-w-5xl space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-cyan-400" />
            <h2 id="showreel-modal-title" className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold m-0">
              4K Master Showreel • {brandTheme.brandName}
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">Press ESC or click X to close</span>
        </div>

        <div className="rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl p-1">
          <VideoPlayer
            video={showreelVideo}
            poster={brandTheme.heroPosterUrl}
            autoPlay={true}
            showBadge={true}
            className="w-full"
          />
        </div>
      </div>
    </dialog>
  );
};
