import React, { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  intensityOverride?: 'low' | 'medium' | 'high';
  opacityOverride?: number;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  className = '',
  intensityOverride,
  opacityOverride,
}) => {
  const { brandTheme } = usePortfolio();
  const aurora = brandTheme.aurora || {
    enabled: true,
    intensity: 'medium',
    blur: 'medium',
    speed: 'slow',
    opacity: 65,
    color1: '#00D4FF',
    color2: '#8B5CF6',
    color3: '#EC4899',
    scrollInteraction: true,
    cursorInteraction: true,
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Subtle Mouse Parallax on Desktop
  useEffect(() => {
    if (!aurora.enabled || !aurora.cursorInteraction || prefersReducedMotion) return;

    let rafId: number;
    let targetX = 50;
    let targetY = 30;
    let currentX = 50;
    let currentY = 30;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth) * 100;
      targetY = (e.clientY / innerHeight) * 100;
    };

    const updateSmooth = () => {
      // Gentle lerp dampening
      currentX += (targetX - currentX) * 0.035;
      currentY += (targetY - currentY) * 0.035;
      setMousePos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateSmooth);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateSmooth);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [aurora.enabled, aurora.cursorInteraction, prefersReducedMotion]);

  // Subtle Scroll Parallax
  useEffect(() => {
    if (!aurora.enabled || !aurora.scrollInteraction || prefersReducedMotion) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [aurora.enabled, aurora.scrollInteraction, prefersReducedMotion]);

  if (!aurora.enabled) {
    return (
      <div className={`relative min-h-screen bg-[#050505] text-neutral-100 ${className}`}>
        {children}
      </div>
    );
  }

  // Calculate blur
  const blurMap = {
    low: 'blur-[60px] md:blur-[80px]',
    medium: 'blur-[100px] md:blur-[140px]',
    high: 'blur-[140px] md:blur-[200px]',
  };
  const activeBlur = blurMap[aurora.blur || 'medium'];

  // Calculate scale / opacity based on intensity
  const intensity = intensityOverride || aurora.intensity || 'medium';
  const intensityOpacityMap = {
    low: 0.35,
    medium: 0.6,
    high: 0.85,
  };
  const baseMultiplier = intensityOpacityMap[intensity];
  const userOpacity = (opacityOverride !== undefined ? opacityOverride : aurora.opacity) / 100;
  const computedOpacity = Math.min(1, Math.max(0.05, userOpacity * baseMultiplier));

  // Speed multiplier style
  const speedDurations = {
    slow: { blob1: '42s', blob2: '54s', blob3: '65s' },
    medium: { blob1: '28s', blob2: '36s', blob3: '44s' },
    fast: { blob1: '16s', blob2: '22s', blob3: '28s' },
  };
  const activeSpeed = speedDurations[aurora.speed || 'slow'];

  // Scroll offset shifts
  const scrollShift1 = scrollY * 0.08;
  const scrollShift2 = -scrollY * 0.05;
  const scrollShift3 = scrollY * 0.03;

  const color1 = aurora.color1 || '#00D4FF';
  const color2 = aurora.color2 || '#8B5CF6';
  const color3 = aurora.color3 || '#EC4899';

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen bg-[#050505] overflow-x-hidden text-neutral-100 ${className}`}
      style={{
        backgroundColor: brandTheme.colors.background || '#050505',
      }}
    >
      {/* Aurora Ambient Light Fields Container (fixed/absolute background) */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-0"
        style={{ opacity: computedOpacity }}
        aria-hidden="true"
      >
        {/* Blob 1: Primary Color (Top Left to Center) */}
        <div
          className={`absolute w-[45vw] h-[45vw] min-w-[360px] min-h-[360px] rounded-full mix-blend-screen animate-aurora-1 ${activeBlur}`}
          style={{
            background: `radial-gradient(circle, ${color1} 0%, rgba(0,0,0,0) 70%)`,
            top: `calc(5% + ${scrollShift1}px)`,
            left: `calc(10% + ${(mousePos.x - 50) * 0.15}%)`,
            animationDuration: prefersReducedMotion ? '0s' : activeSpeed.blob1,
            opacity: 0.85,
          }}
        />

        {/* Blob 2: Secondary Color (Top Right / Middle) */}
        <div
          className={`absolute w-[50vw] h-[50vw] min-w-[400px] min-h-[400px] rounded-full mix-blend-screen animate-aurora-2 ${activeBlur}`}
          style={{
            background: `radial-gradient(circle, ${color2} 0%, rgba(0,0,0,0) 72%)`,
            top: `calc(20% + ${scrollShift2}px)`,
            right: `calc(5% - ${(mousePos.x - 50) * 0.12}%)`,
            animationDuration: prefersReducedMotion ? '0s' : activeSpeed.blob2,
            opacity: 0.75,
          }}
        />

        {/* Blob 3: Tertiary Color (Bottom Center to Deep Floor) */}
        <div
          className={`absolute w-[55vw] h-[45vw] min-w-[380px] min-h-[380px] rounded-full mix-blend-screen animate-aurora-3 ${activeBlur}`}
          style={{
            background: `radial-gradient(circle, ${color3} 0%, rgba(0,0,0,0) 70%)`,
            top: `calc(55% + ${scrollShift3}px)`,
            left: `calc(25% + ${(mousePos.y - 50) * 0.1}%)`,
            animationDuration: prefersReducedMotion ? '0s' : activeSpeed.blob3,
            opacity: 0.65,
          }}
        />

        {/* Interactive Mouse Follow Glow Spot (Subtle desktop spotlight) */}
        {aurora.cursorInteraction && !prefersReducedMotion && (
          <div
            className="absolute w-[30vw] h-[30vw] min-w-[260px] min-h-[260px] rounded-full mix-blend-screen blur-[100px] pointer-events-none transition-opacity duration-1000 hidden md:block"
            style={{
              background: `radial-gradient(circle, ${color1}55 0%, ${color2}22 45%, transparent 70%)`,
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.45,
            }}
          />
        )}

        {/* Deep Dark Vignette & Floor Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]/90 pointer-events-none" />
      </div>

      {/* Film Grain Subtle Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] film-grain opacity-40 mix-blend-overlay" />

      {/* Main Content Layer */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};
