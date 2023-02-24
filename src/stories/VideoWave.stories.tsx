import { useState, useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VideoWave } from '../components/VideoWave/VideoWave';
import { mockData } from '../mock/mockData';
import { VideoProps } from '../types';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

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
  const [key, setKey] = useState(Date.now());

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

  return (
    <>
      {selectedVideo && (
        <>
          <FormControl margin='normal'>
            <Select id='Select Video' value={selectedVideo?.url as any} onChange={handleSelect}>
              {options.map((option) => (
                <MenuItem value={option.url}>{option.url.split('/').pop()}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <VideoWave
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
