import React from 'react'
import {faBackward, faForward, faPause, faPlay} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function Control(props) {
  return (
    <div className='control'>
        <button className='control_SkipButton' onClick={() => props.skipSong(false)}>
            <FontAwesomeIcon icon={faBackward}/>
        </button>
        <button className='control_PlayButton' onClick={() => props.setIsPlaying(!props.isPlaying)}>
            <FontAwesomeIcon icon={props.isPlaying ? faPause: faPlay}/>
        </button>
        <button className='control_SkipButton' onClick={() => props.skipSong()}>
            <FontAwesomeIcon icon={faForward}/>
        </button>
    </div>
  )
}

export default Control