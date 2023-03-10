import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

export type MediaType =
  | 'video/mp4'
  | 'video/webm'
  | 'video/ogg'
  | 'application/x-mpegURL'
  | 'application/dash+xml'
  | 'audio/mp3';
export type FilterVariants = 'oscilloscope' | 'spectrogram' | 'spectrum';
export type VideoProps = {
  isMinimapEnabled?: Boolean;
  setMinimapEnabled?: (value: boolean) => void;
  type: MediaType;
  url: string;
  variant?: FilterVariants;
};

export type VideoPlayerProps = {
  height: number;
  setMinimapEnabled?: (value: boolean) => void;
  source: VideoProps;
  onReady: (source: VideoProps, player: VideoJsPlayer) => void;
};
