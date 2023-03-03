import { useState, useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VideoWave } from '../components/VideoWave/VideoWave';
import { mockData } from '../mock/mockData';
import { VideoProps } from '../types';
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

/**
 * The props for the VideoWave story.
 */
const meta: ComponentMeta<typeof VideoWave> = {
  title: 'VideoWave',
  component: VideoWave,
};

/**
 * The Oscilloscope Variant story for the VideoWave component.
 */
const VideoWaveStory = (props: Pick<VideoProps, 'variant'>) => {
  const { variant } = props;
  const [options, setOptions] = useState<VideoProps[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoProps | null>(null);
  const [isMinimapEnabled, setMinimapEnabled] = useState(false);
  const [key, setKey] = useState(Date.now());
  const classes = useStyles();

  useEffect(() => {
    setOptions(mockData);
    setSelectedVideo(mockData[0]);
  }, []);

  /**
   * Handle the change event of the select element.
   * @param event - The select change event.
   */
  const handleSelect = (event: SelectChangeEvent<HTMLSelectElement>): void => {
    const selectedOption = options.find((option) => option.url === event.target.value);
    selectedOption && setSelectedVideo(selectedOption);
    setKey(Date.now()); // update the key to unmount the component
  };

  /**
   * Handle the change event of the Switch element.
   * @param value - The switch value on or off
   */
  const handleSwitch = (value: boolean) => {
    setMinimapEnabled(value);
    setKey(Date.now());
  };

  return (
    <>
      {selectedVideo && (
        <>
          <FormControl margin='normal' className={classes.flex}>
            <div className={classes.flex}>
              <Typography variant='body1'>Select Variant</Typography>
              <Select id='Select Video' value={selectedVideo?.url as any} onChange={handleSelect}>
                {options.map((option) => (
                  <MenuItem value={option.url}>{option.url.split('/').pop()}</MenuItem>
                ))}
              </Select>
            </div>
            <div className={classes.flex}>
              <Typography variant='body1'>Display Minimap</Typography>
              <Switch checked={isMinimapEnabled} onChange={(e) => handleSwitch(e.currentTarget.checked)} />
            </div>
          </FormControl>
          <VideoWave
            isMinimapEnabled={isMinimapEnabled}
            key={key} // use a unique key to unmount the component
            type={selectedVideo.type}
            url={selectedVideo.url}
            variant={variant}
          />
        </>
      )}
    </>
  );
};

export const OscilloscopeVariant: ComponentStory<typeof VideoWave> = () => <VideoWaveStory variant='oscilloscope' />;
export const SpectrumVariant: ComponentStory<typeof VideoWave> = () => <VideoWaveStory variant='spectrum' />;
export const SpectrogramVariant: ComponentStory<typeof VideoWave> = () => <VideoWaveStory variant='spectrogram' />;

export default meta;
