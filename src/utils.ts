import {
  INITIAL_HEIGHT,
  INITIAL_MINIMAP_WAVEFORM_HEIGHT,
  MINIMAP_CONTAINER_ID,
  WAVEFORM_CONTAINER_ID,
} from './constants';

type Heights = {
  videoHeight: number;
  waveformHeight: number;
  minimapHeight: number;
};

export function calculateHeights(viewportHeight: number, viewportWidth: number, container: Element): Heights {
  const waveformChild = container.querySelector<HTMLElement>(`#${WAVEFORM_CONTAINER_ID}`);
  const minimapWaveformChild = container.querySelector<HTMLElement>(`#${MINIMAP_CONTAINER_ID}`);

  // calculate the heights based on the viewport size
  let videoHeight = 0;
  let waveformHeight = 0;
  let minimapHeight = 0;

  if (viewportHeight < 200 || viewportWidth < 400) {
    minimapHeight = Math.round(viewportHeight - 10);
  } else if (viewportHeight < 350 || viewportWidth < 426) {
    const height = Math.floor((viewportHeight - 10) / 2);
    waveformHeight = height;
    minimapHeight = height;
  } else {
    videoHeight = INITIAL_HEIGHT;
    const availableHeight = viewportHeight - videoHeight;
    waveformHeight = Math.round(Math.min(availableHeight * 0.75, 300));
    minimapHeight = Math.round(
      Math.min(availableHeight * 0.25, INITIAL_MINIMAP_WAVEFORM_HEIGHT, waveformHeight * 0.33),
    );
  }

  // adjust the waveform and minimap heights if necessary
  if (waveformChild) {
    const waveHeight = minimapWaveformChild ? waveformHeight : waveformHeight + minimapHeight;
    waveformHeight = waveHeight;
    minimapHeight = minimapWaveformChild ? minimapHeight : 0;
  } else if (minimapWaveformChild) {
    const minimapWaveHeight = waveformHeight ? minimapHeight : waveformHeight + minimapHeight;
    minimapHeight = minimapWaveHeight;
    waveformHeight = 0;
  }

  return { videoHeight, waveformHeight, minimapHeight };
}
