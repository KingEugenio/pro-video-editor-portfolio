/**
 * CineFolio Media Provider Abstraction Layer
 * 
 * Standardizes access, validation, thumbnail generation, and playback resolution
 * across Direct Upload, Google Drive, YouTube, Vimeo, and custom streams.
 */

import { MediaProviderType, NormalizedPlayback, VideoOrientation, AspectRatioType } from '../types/media';
import { MediaResolver } from './mediaResolver';

export interface MediaMetadata {
  id: string;
  provider: MediaProviderType;
  title: string;
  duration?: string;
  width?: number;
  height?: number;
  aspectRatio: AspectRatioType;
  orientation: VideoOrientation;
  fileSize?: string;
  mimeType?: string;
  thumbnailUrl: string;
  rawUrl: string;
}

export interface IMediaProvider {
  readonly providerType: MediaProviderType;
  readonly providerName: string;

  validate(urlOrId: string): boolean;
  getThumbnail(urlOrId: string, width?: number): string;
  getMetadata(urlOrId: string, fallbackTitle?: string): Promise<MediaMetadata>;
  resolvePlaybackSource(urlOrId: string, options?: { autoPlay?: boolean; muted?: boolean; loop?: boolean }): NormalizedPlayback;
}

/**
 * 1. Direct Upload / CDN File Provider
 */
export class DirectUploadProvider implements IMediaProvider {
  public readonly providerType: MediaProviderType = 'direct_upload';
  public readonly providerName = 'Direct File / CDN';

  validate(url: string): boolean {
    return Boolean(url && (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')));
  }

  getThumbnail(url: string): string {
    return url;
  }

  async getMetadata(url: string, fallbackTitle = 'Direct Video Asset'): Promise<MediaMetadata> {
    return {
      id: 'media_' + Math.random().toString(36).substring(2, 9),
      provider: 'direct_upload',
      title: fallbackTitle,
      aspectRatio: '16:9',
      orientation: 'landscape',
      thumbnailUrl: url,
      rawUrl: url,
    };
  }

  resolvePlaybackSource(url: string, options?: { autoPlay?: boolean; muted?: boolean; loop?: boolean }): NormalizedPlayback {
    return MediaResolver.resolve(url, options);
  }
}

/**
 * 2. Google Drive Provider
 */
export class GoogleDriveProvider implements IMediaProvider {
  public readonly providerType: MediaProviderType = 'google_drive';
  public readonly providerName = 'Google Drive Hub';

  validate(urlOrId: string): boolean {
    return Boolean(MediaResolver.extractGoogleDriveId(urlOrId));
  }

  getThumbnail(urlOrId: string, width = 1280): string {
    return MediaResolver.buildGoogleDriveThumbnailUrl(urlOrId, width);
  }

  async getMetadata(urlOrId: string, fallbackTitle = 'Google Drive Video'): Promise<MediaMetadata> {
    const fileId = MediaResolver.extractGoogleDriveId(urlOrId) || urlOrId;
    return {
      id: fileId,
      provider: 'google_drive',
      title: fallbackTitle,
      aspectRatio: '16:9',
      orientation: 'landscape',
      thumbnailUrl: this.getThumbnail(fileId),
      rawUrl: `https://drive.google.com/file/d/${fileId}/view`,
    };
  }

  resolvePlaybackSource(urlOrId: string, options?: { autoPlay?: boolean; muted?: boolean; loop?: boolean }): NormalizedPlayback {
    return MediaResolver.resolve({ url: urlOrId, provider: 'google_drive' }, options);
  }
}

/**
 * 3. YouTube Provider
 */
export class YouTubeProvider implements IMediaProvider {
  public readonly providerType: MediaProviderType = 'youtube';
  public readonly providerName = 'YouTube';

  validate(urlOrId: string): boolean {
    return Boolean(MediaResolver.extractYouTubeId(urlOrId));
  }

  getThumbnail(urlOrId: string): string {
    return MediaResolver.buildYouTubeThumbnailUrl(urlOrId);
  }

  async getMetadata(urlOrId: string, fallbackTitle = 'YouTube Video'): Promise<MediaMetadata> {
    const videoId = MediaResolver.extractYouTubeId(urlOrId) || urlOrId;
    const isShorts = urlOrId.includes('/shorts/');
    return {
      id: videoId,
      provider: 'youtube',
      title: fallbackTitle,
      aspectRatio: isShorts ? '9:16' : '16:9',
      orientation: isShorts ? 'portrait' : 'landscape',
      thumbnailUrl: this.getThumbnail(videoId),
      rawUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  }

  resolvePlaybackSource(urlOrId: string, options?: { autoPlay?: boolean; muted?: boolean; loop?: boolean }): NormalizedPlayback {
    return MediaResolver.resolve({ url: urlOrId, provider: 'youtube' }, options);
  }
}

/**
 * 4. Vimeo Provider
 */
export class VimeoProvider implements IMediaProvider {
  public readonly providerType: MediaProviderType = 'vimeo';
  public readonly providerName = 'Vimeo';

  validate(urlOrId: string): boolean {
    return Boolean(MediaResolver.extractVimeoId(urlOrId));
  }

  getThumbnail(urlOrId: string): string {
    return '';
  }

  async getMetadata(urlOrId: string, fallbackTitle = 'Vimeo Showcase'): Promise<MediaMetadata> {
    const vimeoId = MediaResolver.extractVimeoId(urlOrId) || urlOrId;
    return {
      id: vimeoId,
      provider: 'vimeo',
      title: fallbackTitle,
      aspectRatio: '16:9',
      orientation: 'landscape',
      thumbnailUrl: this.getThumbnail(vimeoId),
      rawUrl: `https://vimeo.com/${vimeoId}`,
    };
  }

  resolvePlaybackSource(urlOrId: string, options?: { autoPlay?: boolean; muted?: boolean; loop?: boolean }): NormalizedPlayback {
    return MediaResolver.resolve({ url: urlOrId, provider: 'vimeo' }, options);
  }
}

/**
 * Unified Media Provider Manager
 */
export class MediaProviderManager {
  private static providers: Map<MediaProviderType, IMediaProvider> = new Map<MediaProviderType, IMediaProvider>([
    ['direct_upload', new DirectUploadProvider()],
    ['google_drive', new GoogleDriveProvider()],
    ['youtube', new YouTubeProvider()],
    ['vimeo', new VimeoProvider()],
    ['direct_url', new DirectUploadProvider()],
  ]);

  public static getProvider(type: MediaProviderType): IMediaProvider {
    return this.providers.get(type) || this.providers.get('direct_upload')!;
  }

  public static detectAndGetProvider(url: string, declaredProvider?: MediaProviderType): IMediaProvider {
    const detected = declaredProvider || MediaResolver.detectProvider(url);
    return this.getProvider(detected);
  }
}
