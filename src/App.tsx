import { VideoWave } from './components/VideoWave/VideoWave';
import { useEffect, useState } from 'react';
import { FilterVariants, VideoProps } from './types';
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
        />
      )}
    </div>
  );
}

export default App;
