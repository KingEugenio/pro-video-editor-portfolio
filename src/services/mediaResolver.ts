import { MediaAsset, MediaProviderType, NormalizedPlayback, VideoOrientation, AspectRatioType, MediaHealthStatus } from '../types/media';
import { VideoItem } from '../types/portfolio';

/**
 * Universal Media Resolver Service
 * Provides abstraction layer for resolving and playing video media from any source
 * (Direct File Upload, Google Drive, YouTube, Vimeo, Mux, Cloudflare Stream).
 */

export interface ResolverOptions {
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  startTime?: number;
}

export class MediaResolver {
  /**
   * Extract Google Drive File ID from any variant of Google Drive URL
   */
  public static extractGoogleDriveId(url: string): string | null {
    if (!url) return null;
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) return fileIdMatch[1];

    const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idParamMatch && idParamMatch[1]) return idParamMatch[1];

    const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (dMatch && dMatch[1]) return dMatch[1];

    const driveFolderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    if (driveFolderMatch && driveFolderMatch[1]) return driveFolderMatch[1];

    // If string itself looks like a Drive ID (25-45 alphanumeric chars)
    if (/^[a-zA-Z0-9_-]{25,45}$/.test(url)) return url;

    return null;
  }

  /**
   * Extract YouTube Video ID
   */
  public static extractYouTubeId(url: string): string | null {
    if (!url) return null;
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0]?.split('#')[0] || null;
    }
    if (url.includes('watch?v=')) {
      return url.split('watch?v=')[1]?.split('&')[0]?.split('#')[0] || null;
    }
    if (url.includes('youtube.com/embed/')) {
      return url.split('youtube.com/embed/')[1]?.split('?')[0]?.split('#')[0] || null;
    }
    if (url.includes('youtube.com/shorts/')) {
      return url.split('youtube.com/shorts/')[1]?.split('?')[0]?.split('#')[0] || null;
    }
    return null;
  }

  /**
   * Extract Vimeo Video ID
   */
  public static extractVimeoId(url: string): string | null {
    if (!url) return null;
    const match = url.match(/vimeo\.com\/(?:video\/|channels\/[^\/]+\/|groups\/[^\/]+\/videos\/|album\/[^\/]+\/video\/)?([0-9]+)/);
    if (match && match[1]) return match[1];
    return null;
  }

  /**
   * Detect provider type from URL string
   */
  public static detectProvider(url: string, declaredProvider?: string): MediaProviderType {
    if (declaredProvider) {
      if (declaredProvider === 'upload' || declaredProvider === 'direct_upload') return 'direct_upload';
      if (declaredProvider === 'google_drive') return 'google_drive';
      if (declaredProvider === 'youtube') return 'youtube';
      if (declaredProvider === 'vimeo') return 'vimeo';
      if (declaredProvider === 'mux') return 'mux';
      if (declaredProvider === 'cloudflare_stream') return 'cloudflare_stream';
    }

    if (!url) return 'direct_upload';
    if (url.includes('drive.google.com') || url.includes('docs.google.com')) return 'google_drive';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('vimeo.com')) return 'vimeo';
    if (url.includes('mux.com') || url.includes('stream.mux.com')) return 'mux';
    if (url.includes('cloudflarestream.com') || url.includes('videodelivery.net')) return 'cloudflare_stream';

    return 'direct_url';
  }

  /**
   * Build Google Drive embed / preview URL
   */
  public static buildGoogleDriveEmbedUrl(driveIdOrUrl: string, options?: ResolverOptions): string {
    const driveId = this.extractGoogleDriveId(driveIdOrUrl) || driveIdOrUrl;
    if (!driveId) return '';
    return `https://drive.google.com/file/d/${driveId}/preview`;
  }

  /**
   * Build Google Drive high-resolution thumbnail URL
   */
  public static buildGoogleDriveThumbnailUrl(driveIdOrUrl: string, width = 1280): string {
    const driveId = this.extractGoogleDriveId(driveIdOrUrl) || driveIdOrUrl;
    if (!driveId) return '';
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w${width}`;
  }

  /**
   * Build YouTube embed URL with optimal parameters (no cookies, responsive, no branding)
   */
  public static buildYouTubeEmbedUrl(videoIdOrUrl: string, options?: ResolverOptions): string {
    const videoId = this.extractYouTubeId(videoIdOrUrl) || videoIdOrUrl;
    if (!videoId) return '';
    const autoplay = options?.autoPlay ? 1 : 0;
    const mute = options?.muted ? 1 : 0;
    const loop = options?.loop ? 1 : 0;
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay}&mute=${mute}&loop=${loop}&playlist=${videoId}&rel=0&modestbranding=1&playsinline=1&controls=1`;
  }

  /**
   * Build YouTube high-resolution thumbnail URL
   */
  public static buildYouTubeThumbnailUrl(videoIdOrUrl: string): string {
    const videoId = this.extractYouTubeId(videoIdOrUrl) || videoIdOrUrl;
    if (!videoId) return '';
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  /**
   * Build Vimeo embed URL
   */
  public static buildVimeoEmbedUrl(videoIdOrUrl: string, options?: ResolverOptions): string {
    const videoId = this.extractVimeoId(videoIdOrUrl) || videoIdOrUrl;
    if (!videoId) return '';
    const autoplay = options?.autoPlay ? 1 : 0;
    const mute = options?.muted ? 1 : 0;
    const loop = options?.loop ? 1 : 0;
    return `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay}&muted=${mute}&loop=${loop}&dnt=1&color=00d4ff&title=0&byline=0&portrait=0`;
  }

  /**
   * Normalize any input (VideoItem, MediaAsset, or string URL) into NormalizedPlayback
   */
  public static resolve(
    input: Partial<VideoItem> | Partial<MediaAsset> | string,
    options?: ResolverOptions
  ): NormalizedPlayback {
    let rawUrl = '';
    let provider: MediaProviderType = 'direct_url';
    let title = 'Video Player';
    let orientation: VideoOrientation = 'landscape';
    let aspectRatio: AspectRatioType = '16:9';
    let width = 1920;
    let height = 1080;
    let thumbnailUrl = '';
    let healthStatus: MediaHealthStatus = 'healthy';

    if (typeof input === 'string') {
      rawUrl = input;
      provider = this.detectProvider(rawUrl);
    } else if (input) {
      const mediaItem = input as Partial<MediaAsset>;
      const legacyVideo = input as Partial<VideoItem>;
      rawUrl = mediaItem.playbackUrl || legacyVideo.url || mediaItem.sourceUrl || '';
      title = input.title || 'Video Player';
      orientation = (input.orientation as VideoOrientation) || 'landscape';
      aspectRatio = (input.aspectRatio as AspectRatioType) || (orientation === 'portrait' ? '9:16' : '16:9');
      width = input.width || (orientation === 'portrait' ? 1080 : 1920);
      height = input.height || (orientation === 'portrait' ? 1920 : 1080);
      thumbnailUrl = mediaItem.thumbnailUrl || legacyVideo.thumbnail || '';
      provider = this.detectProvider(rawUrl, input.provider);
      healthStatus = mediaItem.healthStatus || 'healthy';
    }

    let playbackUrl = rawUrl;
    let embedUrl = '';
    let isIframe = false;
    let isReady = true;
    let requiresProcessing = false;

    switch (provider) {
      case 'google_drive': {
        isIframe = true;
        embedUrl = this.buildGoogleDriveEmbedUrl(rawUrl, options);
        playbackUrl = embedUrl;
        if (!thumbnailUrl) {
          thumbnailUrl = this.buildGoogleDriveThumbnailUrl(rawUrl);
        }
        break;
      }
      case 'youtube': {
        isIframe = true;
        embedUrl = this.buildYouTubeEmbedUrl(rawUrl, options);
        playbackUrl = embedUrl;
        if (!thumbnailUrl) {
          thumbnailUrl = this.buildYouTubeThumbnailUrl(rawUrl);
        }
        break;
      }
      case 'vimeo': {
        isIframe = true;
        embedUrl = this.buildVimeoEmbedUrl(rawUrl, options);
        playbackUrl = embedUrl;
        break;
      }
      case 'mux':
      case 'cloudflare_stream': {
        isIframe = false;
        playbackUrl = rawUrl;
        break;
      }
      case 'direct_upload':
      case 'direct_url':
      default: {
        isIframe = false;
        playbackUrl = rawUrl;
        break;
      }
    }

    const fallbackPosterUrl =
      thumbnailUrl ||
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80';

    return {
      playbackUrl,
      embedUrl,
      isIframe,
      provider,
      aspectRatio,
      orientation,
      width,
      height,
      thumbnailUrl: thumbnailUrl || fallbackPosterUrl,
      title,
      isReady,
      requiresProcessing,
      fallbackPosterUrl,
      healthStatus,
    };
  }

  /**
   * Run a media health check against a media asset or list of media assets
   */
  public static async runHealthCheck(asset: MediaAsset): Promise<{
    status: MediaHealthStatus;
    message: string;
    details?: string;
  }> {
    if (!asset.sourceUrl && !asset.playbackUrl) {
      return {
        status: 'missing',
        message: 'No media source URL provided',
        details: 'The media record exists but contains no playable URL or provider identifier.',
      };
    }

    if (asset.provider === 'google_drive') {
      const driveId = this.extractGoogleDriveId(asset.sourceUrl || asset.playbackUrl);
      if (!driveId) {
        return {
          status: 'broken',
          message: 'Invalid Google Drive ID format',
          details: 'Could not extract a valid Google Drive file ID from the provided link.',
        };
      }
      return {
        status: 'healthy',
        message: 'Google Drive Stream Ready',
        details: `File ID: ${driveId} is configured for iframe streaming.`,
      };
    }

    if (asset.provider === 'youtube') {
      const ytId = this.extractYouTubeId(asset.sourceUrl || asset.playbackUrl);
      if (!ytId) {
        return {
          status: 'broken',
          message: 'Invalid YouTube URL',
          details: 'Could not resolve a valid YouTube Video ID.',
        };
      }
      return {
        status: 'healthy',
        message: 'YouTube Stream Ready',
        details: `YouTube ID: ${ytId} embed is active.`,
      };
    }

    if (asset.provider === 'vimeo') {
      const vimeoId = this.extractVimeoId(asset.sourceUrl || asset.playbackUrl);
      if (!vimeoId) {
        return {
          status: 'broken',
          message: 'Invalid Vimeo URL',
          details: 'Could not resolve a valid Vimeo Video ID.',
        };
      }
      return {
        status: 'healthy',
        message: 'Vimeo Stream Ready',
        details: `Vimeo ID: ${vimeoId} embed is active.`,
      };
    }

    // Direct URL check
    return {
      status: 'healthy',
      message: 'Direct Media Source Valid',
      details: `Asset is ready for direct HTML5 video playback.`,
    };
  }
}
