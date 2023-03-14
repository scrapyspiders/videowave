import { useEffect, useMemo, useRef } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import { getAudioFilterNode, getVideoJsOptions, VIDEO_CONTAINER_ID } from '../../constants';
import type { VideoPlayerProps } from '../../types';

const setPlayerOptions = (player: VideoJsPlayer, options: VideoJsPlayerOptions) => {
  player.autoplay(options.autoplay!);
  player.src(options.sources!);
  player.width(options.width!);
};

const resizeSurferAndMinimap = (surfer: any) => {
  surfer?._onResize();
  if (surfer?.minimap) {
    surfer?.minimap?._onResize();
  }
};

export const VideoPlayer = (props: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  const videoJsOptions = useMemo(
    () => getVideoJsOptions(props.height, props.source.variant!, props.source.isMinimapEnabled!),
    [props.source.variant, props.source.isMinimapEnabled, props.height],
  );

  const createVideoAndWaveform = () => {
    const videoElement = document.createElement('video-js');
    videoElement.classList.add('vjs-default-skin');
    videoRef.current?.appendChild(videoElement);

    const player = videojs(videoElement, { ...videoJsOptions, crossOrigin: 'anonymous' } as any, () => {
      if (props.onReady) {
        props.onReady({ url: props.source.url, type: props.source.type }, player);
      }
    });
    playerRef.current = player;
    const surfer = (player as any)?.wavesurfer()?.surfer;
    if (surfer) {
      resizeSurferAndMinimap(surfer);
    }
  };

  useEffect(() => {
    if (!playerRef.current) {
      createVideoAndWaveform();
    } else {
      const player = playerRef.current;
      setPlayerOptions(player, videoJsOptions);
      const surfer = (player as any)?.wavesurfer()?.surfer;
      const audioCtx = (surfer as any).backend.ac;
      surfer.backend.setFilter(getAudioFilterNode(audioCtx, props.audioFilter));
      if (surfer) {
        resizeSurferAndMinimap(surfer);
      }
    }
    // eslint-disable-next-line
  }, [props, playerRef, videoRef]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <>
      <div id={VIDEO_CONTAINER_ID} ref={videoRef} />
    </>
  );
};
