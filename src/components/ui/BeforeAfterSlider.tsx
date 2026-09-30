import React, { useState, useRef } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'RAW LOG FOOTAGE',
  afterLabel = 'ACES COLOR GRADED',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <figure
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      role="region"
      aria-label="Before and after color grade comparison slider"
      className={`relative select-none overflow-hidden rounded-2xl border border-white/10 shadow-2xl aspect-video w-full cursor-ew-resize ${className}`}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={`${afterLabel} — Fully graded and color mastered video still frame`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider backdrop-blur-md">
        {afterLabel}
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={`${beforeLabel} — Flat camera LOG RAW uncorrected video still frame`}
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
        />
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-neutral-950/80 border border-white/20 text-neutral-300 text-xs font-mono font-bold tracking-wider backdrop-blur-md">
          {beforeLabel}
        </div>
      </div>

      {/* Center Dividing Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,212,255,0.8)] pointer-events-none z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-cyan-400 text-neutral-950 flex items-center justify-center shadow-lg border-2 border-white">
          <SlidersHorizontal className="w-4 h-4" />
        </div>
      </div>

      {/* Instruction indicator */}
      <figcaption className="absolute bottom-3 inset-x-0 mx-auto w-fit px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-neutral-400 pointer-events-none">
        Drag slider left / right to compare color grade
      </figcaption>
    </figure>
  );
};
