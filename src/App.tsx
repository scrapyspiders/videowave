import { VideoWave } from './components/VideoWave/VideoWave';
import { useEffect, useState } from 'react';
import { FilterVariants, VideoProps } from './types';
import { server } from './mock/mirage';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

function App() {
  const [video, setVideo] = useState<VideoProps | null>(null);
  const [filter, setFilters] = useState<FilterVariants>('oscilloscope');
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    fetch('/api/getVideo')
      .then((res) => res.json())
      .then((video) => setVideo(video));

    return () => server.shutdown();
  }, []);

  const handleFilters = (event: SelectChangeEvent<HTMLSelectElement>) => {
    setFilters(event.target.value as FilterVariants);
    setKey(Date.now());
  };

  return (
    <div>
      <FormControl margin='normal'>
        <Select id='Select Video' value={filter as any} onChange={handleFilters}>
          <MenuItem value='oscilloscope'>Oscilloscope</MenuItem>
          <MenuItem value='spectrogram'>Spectrogram</MenuItem>
          <MenuItem value='spectrum'>Spectrum</MenuItem>
        </Select>
      </FormControl>
      {video && <VideoWave key={key} variant={filter} type={video.type} url={video.url} />}
    </div>
  );
}

export default App;
