import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  RotateCcw,
  AlertCircle,
  Settings,
  PictureInPicture2,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { VideoItem } from '../../types/portfolio';
import { MediaAsset } from '../../types/media';
import { MediaResolver } from '../../services/mediaResolver';

export interface UniversalVideoPlayerProps {
  video?: Partial<VideoItem>;
  mediaAsset?: Partial<MediaAsset>;
  src?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  showBadge?: boolean;
  showControls?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export const UniversalVideoPlayer: React.FC<UniversalVideoPlayerProps> = ({
  video,
  mediaAsset,
  src,
  poster,
  autoPlay = false,
  loop = true,
  muted = false,
  className = '',
  showBadge = true,
  showControls = true,
  onPlay,
  onPause,
  onEnded,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Normalize source input
  const playback = MediaResolver.resolve(
    mediaAsset || video || src || '',
    { autoPlay, loop, muted: autoPlay || muted }
  );

  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isMuted, setIsMuted] = useState<boolean>(autoPlay || muted);
  const [volume, setVolume] = useState<number>(0.9);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [bufferedPercent, setBufferedPercent] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPiPActive, setIsPiPActive] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hoverTime, setHoverTime] = useState<{ visible: boolean; time: number; x: number }>({
    visible: false,
    time: 0,
    x: 0,
  });

  const activePoster = poster || playback.thumbnailUrl || playback.fallbackPosterUrl;

  // Aspect ratio classes
  const aspectClasses: Record<string, string> = {
    '16:9': 'aspect-video w-full',
    '9:16': 'aspect-[9/16] max-w-[340px] md:max-w-[380px] mx-auto',
    '1:1': 'aspect-square max-w-[480px] mx-auto',
    '4:5': 'aspect-[4/5] max-w-[420px] mx-auto',
    '2.35:1': 'aspect-[2.35/1] w-full',
    custom: 'aspect-video w-full',
  };

  const badgeLabels: Record<string, string> = {
    '16:9': '16:9 • Landscape',
    '9:16': '9:16 • Vertical Reel / Short',
    '1:1': '1:1 • Square Social',
    '4:5': '4:5 • Feed Portrait',
    '2.35:1': '2.35:1 • Anamorphic',
    custom: 'Custom Aspect',
  };

  const currentAspectClass =
    aspectClasses[playback.aspectRatio] ||
    (playback.orientation === 'portrait' ? aspectClasses['9:16'] : aspectClasses['16:9']);

  // Format seconds to mm:ss
  const formatTime = (secs: number): string => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (playback.isIframe) return;
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        onPause?.();
      } else {
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            onPlay?.();
          })
          .catch((err) => {
            console.warn('Autoplay/play policy interrupted:', err);
          });
      }
    }
  }, [isPlaying, onPlay, onPause, playback.isIframe]);

  // Volume toggle
  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted && volume === 0) {
        setVolume(0.8);
        videoRef.current.volume = 0.8;
      }
    }
  }, [isMuted, volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  // Fullscreen
  const toggleFullscreen = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  // PiP
  const togglePiP = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiPActive(false);
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
        setIsPiPActive(true);
      }
    } catch (err) {
      console.warn('Picture-in-picture error:', err);
    }
  };

  // Speed change
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setIsSpeedMenuOpen(false);
  };

  // Seek bar click
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!progressBarRef.current || !videoRef.current || isNaN(duration) || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = pos * duration;
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  // Seek bar hover
  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const time = pos * duration;
    setHoverTime({
      visible: true,
      time,
      x: e.clientX - rect.left,
    });
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if container is focused or active
      if (!containerRef.current?.contains(document.activeElement)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.muted = !isMuted;
          setIsMuted(!isMuted);
        }
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'ArrowRight' && videoRef.current) {
        e.preventDefault();
        videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
      } else if (e.code === 'ArrowLeft' && videoRef.current) {
        e.preventDefault();
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, toggleFullscreen, isMuted, duration]);

  // Video Time Update & Buffering
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.buffered.length > 0 && duration > 0) {
      const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBufferedPercent((bufferedEnd / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    setIsLoading(false);
    setHasError(false);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <figure
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label={playback.title || 'Video Player'}
      className={`relative group rounded-2xl overflow-hidden bg-neutral-950/95 border border-white/10 shadow-2xl flex items-center justify-center select-none outline-none focus:ring-1 focus:ring-cyan-500/50 ${currentAspectClass} ${className}`}
    >
      {/* Top Floating Badge (Aspect Ratio & Source) */}
      {showBadge && (
        <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-wider text-neutral-300 pointer-events-none flex items-center gap-2 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>{badgeLabels[playback.aspectRatio] || playback.aspectRatio}</span>
          {playback.provider === 'google_drive' && (
            <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[9px] font-bold">
              G-DRIVE
            </span>
          )}
        </div>
      )}

      {/* Error View State */}
      {hasError ? (
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-neutral-950/90 text-neutral-300 w-full h-full space-y-3 z-20 backdrop-blur-md">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white font-heading">
              Video Temporarily Unavailable
            </h4>
            <p className="text-xs text-neutral-400 max-w-sm font-body">
              {errorMessage || 'The media source is reconnecting. Please check connection and retry.'}
            </p>
          </div>
          <button
            onClick={handleRetry}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-2 transition-all cursor-pointer border border-white/10 shadow-lg"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            Retry Playback
          </button>
        </div>
      ) : playback.isIframe ? (
        /* Iframe Player (Google Drive, YouTube, Vimeo) */
        <div className="relative w-full h-full bg-black">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 z-10 space-y-2">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <span className="text-xs font-mono text-neutral-400">Connecting Media Stream...</span>
            </div>
          )}
          <iframe
            src={playback.embedUrl}
            title={playback.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
              setErrorMessage('Failed to load embedded video stream.');
            }}
          />
        </div>
      ) : (
        /* Native HTML5 Video Player with Custom Aurora Controls */
        <>
          <video
            ref={videoRef}
            src={playback.playbackUrl}
            poster={activePoster}
            autoPlay={autoPlay}
            loop={loop}
            muted={isMuted}
            playsInline
            controls={false}
            onClick={togglePlay}
            onPlay={() => {
              setIsPlaying(true);
              onPlay?.();
            }}
            onPause={() => {
              setIsPlaying(false);
              onPause?.();
            }}
            onEnded={() => {
              setIsPlaying(false);
              onEnded?.();
            }}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
              setErrorMessage('Direct media file could not be decoded.');
            }}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Loading Spinner Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs pointer-events-none z-15">
              <div className="p-3 rounded-full bg-black/70 border border-white/10 text-cyan-400">
                <Loader2 className="w-7 h-7 animate-spin" />
              </div>
            </div>
          )}

          {/* Center Play Button Pulse Overlay */}
          {!isPlaying && !isLoading && (
            <button
              id={`play-center-btn-${playback.title.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={togglePlay}
              aria-label="Play video"
              className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500/90 text-neutral-950 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer z-15"
            >
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
          )}

          {/* Bottom Custom Glass Control Bar */}
          {showControls && (
            <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 text-white z-20">
              {/* Interactive Scrubber Bar */}
              <div
                ref={progressBarRef}
                onClick={handleScrub}
                onMouseMove={handleProgressMouseMove}
                onMouseLeave={() => setHoverTime((prev) => ({ ...prev, visible: false }))}
                className="relative w-full h-2 rounded-full bg-white/20 hover:h-3 transition-all cursor-pointer group/bar overflow-visible"
              >
                {/* Buffer Track */}
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-white/30 transition-all duration-150"
                  style={{ width: `${bufferedPercent}%` }}
                />
                {/* Played Track */}
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-cyan-400 shadow-[0_0_10px_#00D4FF]"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
                {/* Scrubber Thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md border-2 border-cyan-400 opacity-0 group-hover/bar:opacity-100 transition-opacity"
                  style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />

                {/* Hover Time Tooltip */}
                {hoverTime.visible && (
                  <div
                    className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 border border-white/10 text-[10px] font-mono text-white pointer-events-none shadow-lg"
                    style={{ left: `${hoverTime.x}px` }}
                  >
                    {formatTime(hoverTime.time)}
                  </div>
                )}
              </div>

              {/* Controls Action Row */}
              <div className="flex items-center justify-between pt-1">
                {/* Left: Play / Pause / Time */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <div className="text-xs font-mono text-neutral-300">
                    <span className="text-white font-semibold">{formatTime(currentTime)}</span>
                    <span className="text-neutral-500 mx-1">/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Right: Volume / Speed / PiP / Fullscreen */}
                <div className="flex items-center gap-2">
                  {/* Volume Control */}
                  <div className="flex items-center gap-1.5 group/vol">
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 accent-cyan-400 cursor-pointer hidden group-hover/vol:block transition-all"
                    />
                  </div>

                  {/* Playback Speed Menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSpeedMenuOpen(!isSpeedMenuOpen);
                      }}
                      className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-mono text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {playbackSpeed}x
                    </button>

                    {isSpeedMenuOpen && (
                      <div className="absolute bottom-full mb-2 right-0 bg-neutral-900/95 border border-white/10 rounded-xl p-1.5 shadow-2xl backdrop-blur-xl z-30 space-y-1 min-w-[70px]">
                        {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                          <button
                            key={s}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeedChange(s);
                            }}
                            className={`w-full text-left px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                              playbackSpeed === s
                                ? 'bg-cyan-500 text-neutral-950 font-bold'
                                : 'text-neutral-300 hover:bg-white/10'
                            }`}
                          >
                            {s}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Picture-in-Picture */}
                  {typeof document !== 'undefined' && 'pictureInPictureEnabled' in document && (
                    <button
                      onClick={togglePiP}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      aria-label="Picture in Picture"
                    >
                      <PictureInPicture2 className="w-4 h-4" />
                    </button>
                  )}

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </figure>
  );
};
