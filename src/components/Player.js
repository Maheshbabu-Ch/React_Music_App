import React, { useEffect, useRef, useState } from 'react'
import Details from './Details'
import Control from './Control'

function Player(props) {
    const audioElement = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime,setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(()=>{
        if(isPlaying)
            audioElement.current.play();
        else
            audioElement.current.pause();
        
    });

    const skipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if(temp > props.songs.length -1)
                    temp = 0;
                
                return temp;
            });
        }else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0)
                    temp = props.songs.length - 1;
                return temp;
            });  
        }
    };


  useEffect(() => {
    // Set up event listeners for time updates and end of playback
    const handleTimeUpdate = () => setCurrentTime(audioElement.current.currentTime);
    const handleDurationChange = () => setDuration(audioElement.current.duration);
    const handleEnded = () => {
      // Automatically play the next song when the current song ends
      props.setCurrentSongIndex(prevIndex => (prevIndex + 1) % props.songs.length);
    };

    audioElement.current.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.current.addEventListener('durationchange', handleDurationChange);
    audioElement.current.addEventListener('ended', handleEnded);

    // Clean up event listeners when the component unmounts
    return () => {
      audioElement.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.current.removeEventListener('durationchange', handleDurationChange);
      audioElement.current.removeEventListener('ended', handleEnded);
    };
  }, [props.currentSongIndex, props.songs]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
      };
      
 
  return (
    <div className='player'>
       <h3 id='head'>Playing Now</h3>
        <Details
            song = {props.songs[props.currentSongIndex]} 
            isPlaying = {isPlaying}/>
        <Control
            isPlaying = {isPlaying}
            setIsPlaying = {setIsPlaying}
            skipSong = {skipSong} />
        {/* <progress value={currentTime} max = {duration}></progress> */}
        {/* <input  type="range"    
                min="0"     
                max={duration}      
                value={currentTime}
                className="progress-bar"
                onChange={(e) => {
                    setCurrentTime(e.target.value);
                    audioElement.current.currentTime = e.target.value;
                }}
        /> */}

<div className='progress-container'>
      <span className='time-display'>{formatTime(currentTime)}</span>
      <div className='progress-bar-container'>
        <div className='progress-bar' style={{ width: `${(currentTime / duration) * 100}%` }}></div>
        <input
          type='range'
          min='0'
          max={duration}
          value={currentTime}
          className='seeker'
          onChange={(e) => {
            setCurrentTime(e.target.value);
            audioElement.current.currentTime = e.target.value;
          }}
        />
      </div>
      <span className='time-display'>{formatTime(duration)}</span>
    </div>

       <audio 
            className='player_audio' 
            src={props.songs[props.currentSongIndex].src} 
            ref={audioElement} controls>
        </audio>
        
       <p>
            Next Up: {" "}
            <span>
                {   props.songs[props.nextSongIndex].title} by {" "}
                {   props.songs[props.nextSongIndex].artist}
            </span>
       </p>
    </div>
  )
}

export default Player