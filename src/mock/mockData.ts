import { VideoProps } from '../types';

export const mockData: VideoProps[] = [
  {
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    type: 'video/mp4',
  },
  {
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    type: 'video/mp4',
  },
  {
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    type: 'video/mp4',
  },
  {
    url: 'https://cdn.bitmovin.com/content/assets/playhouse-vr/m3u8s/105560.m3u8',
    type: 'application/x-mpegURL',
  },
  {
    url: 'https://cdn.bitmovin.com/content/assets/playhouse-vr/mpds/105560.mpd',
    type: 'application/dash+xml',
  },
];
