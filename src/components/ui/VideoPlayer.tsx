import React from 'react';
import { UniversalVideoPlayer, UniversalVideoPlayerProps } from './UniversalVideoPlayer';

export type VideoPlayerProps = UniversalVideoPlayerProps;

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  return <UniversalVideoPlayer {...props} />;
};
