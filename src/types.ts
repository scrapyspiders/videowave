import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

export type VideoType = 'video/mp4' | 'video/webm' | 'video/ogg' | 'application/x-mpegURL' | 'application/dash+xml';
export type FilterVariants = 'oscilloscope' | 'spectrogram' | 'spectrum';
export type VideoProps = {
  url: string;
  type: VideoType;
  variant?: FilterVariants;
};

export type VideoPlayerProps = {
  options: VideoJsPlayerOptions;
  source: VideoProps;
  onReady: (source: VideoProps, player: VideoJsPlayer) => void;
};
