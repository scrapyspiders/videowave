import { VideoJsPlayerOptions } from 'video.js';
import { AudioFilters, FilterVariants } from './types';
import 'video.js/dist/video-js.css';
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import 'videojs-wavesurfer/dist/videojs.wavesurfer.js';

interface WaveSurferVariant {
  barWidth?: number;
  barHeight?: number;
  barGap?: number;
  normalize?: boolean;
}

const CURSOR_COLOR = 'black';
const INITIAL_WIDTH = 640;
export const INITIAL_VIDEO_HEIGHT = 300;
export const INITIAL_WAVEFORM_HEIGHT = 270;
export const INITIAL_MINIMAP_WAVEFORM_HEIGHT = 120;
export const AUDIO_CONTAINER_ID = 'audio-container';
export const VIDEO_CONTAINER_ID = 'video-container';
export const WAVEFORM_CONTAINER_ID = 'waveform';
export const MINIMAP_CONTAINER_ID = 'minimap-waveform';

const wavesurferVariants: Record<FilterVariants, WaveSurferVariant> = {
  oscilloscope: {},
  spectrum: {
    barWidth: 1,
    barHeight: 1,
    barGap: 0,
    normalize: true,
  },
  spectrogram: {
    barWidth: 2,
    barHeight: 30,
    barGap: 1,
    normalize: false,
  },
};

// Create the options object
const getVideoJsOptions = (
  height: number,
  variant: FilterVariants,
  isMinimapEnabled: Boolean,
): VideoJsPlayerOptions => {
  const WaveSurferMinimap = (window.WaveSurfer as any).minimap;
  const minimapPlugin = isMinimapEnabled
    ? WaveSurferMinimap.create({
        container: `#${MINIMAP_CONTAINER_ID}`,
        waveColor: '#ccc',
        progressColor: 'purple',
        height: INITIAL_MINIMAP_WAVEFORM_HEIGHT,
        hideScrollbar: true,
        responsive: true,
      })
    : null;

  return {
    autoplay: true,
    bigPlayButton: false,
    controls: true,
    fluid: false,
    height,
    inactivityTimeout: 0,
    loop: false,
    muted: false,
    playsinline: true,
    responsive: true,
    controlBar: { fullscreenToggle: false },
    plugins: {
      // Pass the options for the Wavesurfer plugin
      wavesurfer: {
        backend: 'MediaElementWebAudio',
        container: `#${WAVEFORM_CONTAINER_ID}`,
        cursorColor: CURSOR_COLOR,
        debug: true,
        displayMilliseconds: true,
        hideScrollbar: true,
        responsive: true,
        ...wavesurferVariants[variant],
        plugins: [minimapPlugin].filter(Boolean),
      },
    },
  };
};

const getAudioOptions = (variant: FilterVariants, isMinimapEnabled: Boolean) => {
  const WaveSurferMinimap = (window.WaveSurfer as any).minimap;
  const minimapPlugin = isMinimapEnabled
    ? WaveSurferMinimap.create({
        container: `#${MINIMAP_CONTAINER_ID}`,
        waveColor: '#ccc',
        progressColor: 'purple',
        height: INITIAL_MINIMAP_WAVEFORM_HEIGHT,
        hideScrollbar: true,
        responsive: true,
      })
    : null;

  return {
    container: `#${WAVEFORM_CONTAINER_ID}`,
    cursorColor: CURSOR_COLOR,
    debug: true,
    displayMilliseconds: true,
    hideScrollbar: true,
    responsive: true,
    height: INITIAL_WAVEFORM_HEIGHT,
    ...wavesurferVariants[variant],
    plugins: [minimapPlugin].filter(Boolean),
  };
};

const getAudioFilterNode = (audioCtx: AudioContext, audioFilter: AudioFilters): AudioNode => {
  switch (audioFilter) {
    case 'lowpass':
      const lowpassFilter = audioCtx.createBiquadFilter();
      lowpassFilter.type = 'lowpass';
      lowpassFilter.frequency.value = 1000;
      return lowpassFilter;
    case 'highpass':
      const highpassFilter = audioCtx.createBiquadFilter();
      highpassFilter.type = 'highpass';
      highpassFilter.frequency.value = 1000;
      return highpassFilter;
    case 'bandpass':
      const bandpassFilter = audioCtx.createBiquadFilter();
      bandpassFilter.type = 'bandpass';
      bandpassFilter.frequency.value = 1000;
      bandpassFilter.Q.value = 3;
      return bandpassFilter;
    default:
      return audioCtx.createGain();
  }
};

export {
  WAVEFORM_CONTAINER_ID as CONTAINER_ID,
  INITIAL_WIDTH,
  INITIAL_VIDEO_HEIGHT as INITIAL_HEIGHT,
  getVideoJsOptions,
  getAudioOptions,
  getAudioFilterNode,
};
