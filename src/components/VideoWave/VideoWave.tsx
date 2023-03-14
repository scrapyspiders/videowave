import { makeStyles } from '@mui/styles';
import videojs, { VideoJsPlayer } from 'video.js';
import { MINIMAP_CONTAINER_ID, WAVEFORM_CONTAINER_ID } from '../../constants';
import { useResizable } from '../../customHooks/useResizable';
import { VideoProps } from '../../types';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: '#ddd',
    height: '85vh',
    overflow: 'hidden',
    resize: 'both',
    border: '1px solid black',
    minWidth: '200px',
    minHeight: '100px',
    '& .vjs-default-skin': {
      width: '100%',
    },
  },
  padding: {
    padding: '4px',
  },
});

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
  const classes = useStyles();

  return (
    <>
      <div ref={ref} className={classes.wrapper}>
        <div className={classes.padding}>
          {props.type === 'audio/mp3' ? (
            <AudioPlayer
              size={size}
              type={props.type}
              url={props.url}
              isMinimapEnabled={props.isMinimapEnabled}
              variant={props.variant}
              audioFilter={props.audioFilter!}
            />
          ) : (
            <>
              <VideoPlayer
                height={size.height}
                source={props}
                setMinimapEnabled={props.setMinimapEnabled}
                onReady={handlePlayerReady}
                audioFilter={props.audioFilter!}
              />
            </>
          )}
        </div>
        <div className={classes.padding} id={WAVEFORM_CONTAINER_ID} />
        {props.isMinimapEnabled && <div className={classes.padding} id={MINIMAP_CONTAINER_ID} />}
      </div>
    </>
  );
};
