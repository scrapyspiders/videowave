- 1.0.0
  - if resolution is less then 426x350px then video will be hidden
  - If video is hidden then waveform and minimap both will have same
  - not forcefully enabling the minimap
  - No scrollbar should appear
  - minimap was in a separate div
    - <div className='wrapper'>
        <div className='video-container'>
          <VideoPlayer /> 
          <div id="waveform" /> 
        </div> 
        <div id="minimap" /> 
      </div>
  - Audio Support
    - {isVideoContent ? <VideoWave /> : <WaveSurfer /> }
  - it should not let me go smaller than 200px wide or 100px tall.
