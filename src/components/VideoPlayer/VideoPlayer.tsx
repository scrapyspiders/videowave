import { useEffect, useRef } from 'react';
import videojs, { VideoJsPlayer } from 'video.js';
import { type VideoPlayerProps } from '../../types';

export const VideoPlayer = (props: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  const createVideoAndWaveform = () => {
    const videoElement = document.createElement('video-js');
    videoElement.classList.add('vjs-default-skin');
    videoRef.current?.appendChild(videoElement);

    const waveElement = document.createElement('div');
    waveElement.setAttribute('id', 'waveform');
    waveRef.current?.appendChild(waveElement);

    const player = videojs(videoElement, props.options, () => {
      videojs.log('player is ready');
      if (props.onReady) props.onReady({ url: props.source.url, type: props.source.type }, player);
    });

    playerRef.current = player;
  };

  useEffect(() => {
    if (!playerRef.current) {
      createVideoAndWaveform();
    } else {
      const player = playerRef.current;
      player.autoplay(props.options.autoplay!);
      player.src(props.options.sources!);
      player.width(props.options.width!);
    }
    // eslint-disable-next-line
  }, [props, playerRef, waveRef, videoRef]);

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
      <div ref={videoRef} />
      <div ref={waveRef} />
    </>
  );
};
