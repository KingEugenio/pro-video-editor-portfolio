export type MediaProviderType =
  | 'direct_upload'
  | 'google_drive'
  | 'youtube'
  | 'vimeo'
  | 'mux'
  | 'cloudflare_stream'
  | 'direct_url';

export type VideoOrientation = 'landscape' | 'portrait' | 'square' | 'custom';
export type AspectRatioType = '16:9' | '9:16' | '1:1' | '4:5' | '2.35:1' | '4:3' | 'custom';

export type MediaProcessingStatus =
  | 'ready'
  | 'processing'
  | 'uploading'
  | 'warning'
  | 'failed'
  | 'drive_source';

export type MediaHealthStatus =
  | 'healthy'
  | 'processing'
  | 'warning'
  | 'broken'
  | 'missing'
  | 'disconnected';

export interface MediaAsset {
  id: string;
  provider: MediaProviderType;
  providerAssetId?: string;
  sourceUrl: string;
  playbackUrl: string;
  thumbnailUrl: string;
  title: string;
  filename: string;
  mimeType: string;
  fileSize: string;
  fileSizeBytes?: number;
  duration: string; // e.g. "01:45"
  durationSeconds?: number;
  width: number;
  height: number;
  aspectRatio: AspectRatioType;
  orientation: VideoOrientation;
  status: MediaProcessingStatus;
  healthStatus: MediaHealthStatus;
  visibility: 'public' | 'private';
  attachedProjectIds: string[];
  tags?: string[];
  folder?: string;
  errorMessage?: string;
  codec?: string;
  fps?: number;
  metadata?: {
    drivePermission?: 'public' | 'anyone_with_link' | 'restricted';
    embeddable?: boolean;
    adaptiveStreaming?: boolean;
    hlsUrl?: string;
    dashUrl?: string;
    lastHealthCheck?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NormalizedPlayback {
  playbackUrl: string;
  embedUrl: string;
  isIframe: boolean;
  provider: MediaProviderType;
  aspectRatio: AspectRatioType;
  orientation: VideoOrientation;
  width: number;
  height: number;
  thumbnailUrl: string;
  title: string;
  isReady: boolean;
  requiresProcessing: boolean;
  fallbackPosterUrl: string;
  healthStatus: MediaHealthStatus;
}
