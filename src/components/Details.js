import React, { useEffect, useState, useSyncExternalStore } from 'react'

function Details(props) {
  const [animationClass, setAnimationClass] = useState("next");
  const [rotate, setRotate] = useState(0);
  // useEffect(()=> {
  //   console.log(props.isPlaying)
  //   if(props.isPlaying)
  //       setAnimationClass("next")
  //   else
  //       setAnimationClass("next")
  // },[props.song])

  useEffect(() =>{
    let a = props.isPlaying ? 'rotate-animation' : 'paused rotate-animation'
    setAnimationClass(a);
    console.log(props.isPlaying);
  },[props.isPlaying])
  return (
    <div className='details'>
        <div className='details_img'>
            <img  className= {animationClass} 
                  src={props.song.img_src} 
                  alt=""
                  style={{transform: `rotate(${rotate}deg)` }}/>
        </div>
        <h3 className='details_title'>{props.song.title}</h3>
        <h3 className='details_artist'>{"~ "}{props.song.artist}</h3>

    </div>
  )
}

export default Details