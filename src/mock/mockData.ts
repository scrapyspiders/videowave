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
  {
    url: 'https://ia802803.us.archive.org/17/items/oar2006-01-14.mix.flac16/oar2006-01-14d2t02.mix.mp3',
    type: 'audio/mp3',
  },
];
