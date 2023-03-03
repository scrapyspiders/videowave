import { useMemo } from 'react';
import videojs, { VideoJsPlayer } from 'video.js';
import { getVideoJsOptions, MINIMAP_CONTAINER_ID, WAVEFORM_CONTAINER_ID } from '../../constants';
import { VideoProps } from '../../types';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import { useResizable } from '../../customHooks/useResizable';

const handlePlayerReady = (source: VideoProps, player: VideoJsPlayer) => {
  player.src({ src: source.url, type: source.type });
  player.on('waiting', () => {
    videojs.log('player is waiting');
  });
  player.on('dispose', () => {
    videojs.log('player will dispose');
  });
};

export const VideoWave = (props: VideoProps) => {
  const [ref, size] = useResizable();

  const videoJsOptions = useMemo(
    () => getVideoJsOptions(size.width, size.height, props.variant!, props.isMinimapEnabled!),
    [size, props.variant, props.isMinimapEnabled],
  );

  return (
    <>
      <div ref={ref} className='video-container'>
        <VideoPlayer options={videoJsOptions} source={props} onReady={handlePlayerReady} />
        <div id={WAVEFORM_CONTAINER_ID} />
        <div id={MINIMAP_CONTAINER_ID} />
      </div>
    </>
  );
};
