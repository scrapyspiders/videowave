import videojs, { VideoJsPlayer } from 'video.js';
import { MINIMAP_CONTAINER_ID, WAVEFORM_CONTAINER_ID } from '../../constants';
import { VideoProps } from '../../types';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import { useResizable } from '../../customHooks/useResizable';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';

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

  return (
    <>
      <span>
        {size.width} - {size.height}
      </span>
      <div ref={ref} className='wrapper'>
        <div className='video-container'>
          {props.type === 'audio/mp3' ? (
            <AudioPlayer
              size={size}
              type={props.type}
              url={props.url}
              isMinimapEnabled={props.isMinimapEnabled}
              variant={props.variant}
            />
          ) : (
            <>
              <VideoPlayer
                height={size.height}
                source={props}
                setMinimapEnabled={props.setMinimapEnabled}
                onReady={handlePlayerReady}
              />
              <div id={WAVEFORM_CONTAINER_ID} />
            </>
          )}
        </div>
        {props.isMinimapEnabled && <div className='minimap-container' id={MINIMAP_CONTAINER_ID} />}
      </div>
    </>
  );
};
