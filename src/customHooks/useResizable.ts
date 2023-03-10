import { useEffect, useRef, useState } from 'react';
import {
  INITIAL_HEIGHT,
  INITIAL_WIDTH,
  MINIMAP_CONTAINER_ID,
  VIDEO_CONTAINER_ID,
  WAVEFORM_CONTAINER_ID,
} from '../constants';
import { calculateHeights } from '../utils';

const toPx = (value: number) => `${value}px`;

const handleContainer = (container: HTMLElement, height: number) => {
  container.style.height = toPx(height);
  const waveElement = container.querySelector('wave') as HTMLElement;
  if (waveElement) {
    waveElement.style.height = toPx(height);
  }
};

export const useResizable = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });

  const handleResize = (entries: ResizeObserverEntry[]) => {
    window.requestAnimationFrame(() => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }
      entries.forEach((entry) => {
        const container = entry.target;
        const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
        const videoContainer = container.querySelector(`#${VIDEO_CONTAINER_ID}`) as HTMLElement;
        const waveformContainer = container.querySelector(`#${WAVEFORM_CONTAINER_ID}`) as HTMLElement;
        const minimapWaveContainer = container.querySelector(`#${MINIMAP_CONTAINER_ID}`) as HTMLElement;
        const { videoHeight, minimapHeight, waveformHeight } = calculateHeights(
          containerHeight,
          containerWidth,
          container,
        );

        if (waveformContainer) {
          handleContainer(waveformContainer, waveformHeight);
          waveformContainer.style.display = waveformHeight || !minimapWaveContainer ? 'block' : 'none';
        }

        if (minimapWaveContainer) {
          handleContainer(minimapWaveContainer, minimapHeight);
        }

        if (videoContainer) {
          videoContainer.style.display = videoHeight ? 'block' : 'none';
        }

        setSize({ width: containerWidth, height: containerHeight });
      });
    });
  };

  useEffect(() => {
    const observer = new ResizeObserver(handleResize);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return [ref, size] as const;
};
