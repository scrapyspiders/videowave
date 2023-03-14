import { useEffect, useMemo, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { getAudioFilterNode, getAudioOptions } from '../../constants';
import { AudioFilters, VideoProps } from '../../types';

export const AudioPlayer = (
  props: VideoProps & {
    size: {
      width: number;
      height: number;
    };
    audioFilter: AudioFilters;
  },
) => {
  const waveformRef = useRef<WaveSurfer>();

  const waveformOptions = useMemo(() => {
    return getAudioOptions(props.variant!, props.isMinimapEnabled!);
  }, [props.variant, props.isMinimapEnabled]);

  useEffect(() => {
    if (waveformRef.current) {
      const waveform = waveformRef.current;
      waveform._onResize();
      if (waveform?.minimap) {
        (waveform.minimap as any)._onResize();
      }
    }
  }, [props.size]);

  useEffect(() => {
    const waveform = WaveSurfer.create(waveformOptions);
    waveformRef.current = waveform;
    waveform.load(props.url);
    waveform.on('ready', () => {
      waveform.play();
    });
    return () => {
      waveform.destroy();
    };
  }, [props.url, waveformOptions]);

  useEffect(() => {
    if (waveformRef.current) {
      const waveform = waveformRef.current;
      const audioCtx = (waveform as any).backend.ac;
      waveform.backend.setFilter(getAudioFilterNode(audioCtx, props.audioFilter));
    }
  }, [props.audioFilter]);

  return null;
};
