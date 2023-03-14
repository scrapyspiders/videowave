import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

export type MediaType =
  | 'video/mp4'
  | 'video/webm'
  | 'video/ogg'
  | 'application/x-mpegURL'
  | 'application/dash+xml'
  | 'audio/mp3';
export type FilterVariants = 'oscilloscope' | 'spectrogram' | 'spectrum';
export type AudioFilters = 'none' | 'lowpass' | 'highpass' | 'bandpass';
export type VideoProps = {
  isMinimapEnabled?: Boolean;
  setMinimapEnabled?: (value: boolean) => void;
  type: MediaType;
  url: string;
  audioFilter?: AudioFilters;
  variant?: FilterVariants;
};

export type VideoPlayerProps = {
  audioFilter: AudioFilters;
  height: number;
  onReady: (source: VideoProps, player: VideoJsPlayer) => void;
  setMinimapEnabled?: (value: boolean) => void;
  source: VideoProps;
};
