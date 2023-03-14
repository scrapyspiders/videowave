import { VideoWave } from './components/VideoWave/VideoWave';
import { useEffect, useState } from 'react';
import { AudioFilters, FilterVariants, VideoProps } from './types';
import { server } from './mock/mirage';
import { FormControl, MenuItem, Select, SelectChangeEvent, Switch, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  flex: {
    display: 'flex !important',
    flexDirection: 'row !important' as any,
    alignItems: 'center',
    gap: '1rem',
  },
});

function App() {
  const [video, setVideo] = useState<VideoProps | null>(null);
  const [filter, setFilters] = useState<FilterVariants>('oscilloscope');
  const [audioFilters, setAudioFilters] = useState<AudioFilters>('none');
  const [isMinimapEnabled, setMinimapEnabled] = useState(false);
  const [key, setKey] = useState(Date.now());
  const classes = useStyles();

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

  const handleAudioFilters = (event: SelectChangeEvent<HTMLSelectElement>) => {
    setAudioFilters(event.target.value as AudioFilters);
  };

  const handleSwitch = (value: boolean) => {
    setMinimapEnabled(value);
    setKey(Date.now());
  };

  return (
    <div>
      <FormControl margin='normal' className={classes.flex}>
        <div className={classes.flex}>
          <Typography variant='body1'>Select Variant</Typography>
          <Select id='Select Video' value={filter as any} onChange={handleFilters}>
            <MenuItem value='oscilloscope'>Oscilloscope</MenuItem>
            <MenuItem value='spectrogram'>Spectrogram</MenuItem>
            <MenuItem value='spectrum'>Spectrum</MenuItem>
          </Select>
        </div>
        <div className={classes.flex}>
          <Typography variant='body1'>Audio Filters</Typography>
          <Select id='Select Filters' value={audioFilters as any} onChange={handleAudioFilters}>
            <MenuItem value='none'>None</MenuItem>
            <MenuItem value='lowpass'>Low</MenuItem>
            <MenuItem value='highpass'>High</MenuItem>
            <MenuItem value='bandpass'>Band</MenuItem>
          </Select>
        </div>
        <div className={classes.flex}>
          <Typography variant='body1'>Display Minimap</Typography>
          <Switch checked={isMinimapEnabled} onChange={(e) => handleSwitch(e.currentTarget.checked)} />
        </div>
      </FormControl>
      {video && (
        <VideoWave
          key={key}
          isMinimapEnabled={isMinimapEnabled}
          setMinimapEnabled={handleSwitch}
          type={video.type}
          url={video.url}
          variant={filter}
          audioFilter={audioFilters}
        />
      )}
    </div>
  );
}

export default App;
