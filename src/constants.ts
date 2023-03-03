import { VideoJsPlayerOptions } from 'video.js';
import { FilterVariants } from './types';
import 'video.js/dist/video-js.css';
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import 'videojs-wavesurfer/dist/videojs.wavesurfer.js';

interface WaveSurferVariant {
  barWidth?: number;
  barHeight?: number;
  barGap?: number;
  normalize?: boolean;
}

export const WAVEFORM_CONTAINER_ID = 'waveform';
export const MINIMAP_CONTAINER_ID = 'minimap-waveform';
const BACKEND = 'MediaElement';
const CURSOR_COLOR = 'black';
const INITIAL_WIDTH = 640;
const INITIAL_HEIGHT = 300;

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
  width: number,
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
        height: 30,
        width: 150,
        hideScrollbar: true,
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
    width,
    plugins: {
      // Pass the options for the Wavesurfer plugin
      wavesurfer: {
        backend: BACKEND,
        container: `#${WAVEFORM_CONTAINER_ID}`,
        cursorColor: CURSOR_COLOR,
        debug: true,
        displayMilliseconds: true,
        hideScrollbar: true,
        ...wavesurferVariants[variant],
        plugins: [minimapPlugin].filter(Boolean),
      },
    },
  };
};

export { WAVEFORM_CONTAINER_ID as CONTAINER_ID, INITIAL_WIDTH, INITIAL_HEIGHT, getVideoJsOptions };
