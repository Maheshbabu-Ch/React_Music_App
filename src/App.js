import { useEffect, useState } from "react";
import Player from "./components/Player";

function App() {

  const [songs] = useState([
    { title:"Naa Ready",artist:"Anirudh Ravichander",img_src:"leo.jpeg",src:"Naa Ready.mp3"} ,
    { title:"Badass",artist:"Anirudh Ravichander",img_src:"leo.jpeg",src:"Badass.mp3"},
    {title:"Chaleya",artist:"Arjith Singh",img_src:"jawan.jpg",src:"Chaleya.mp3" }
  ])

  const [currentSongIndex,setCurrentSongIndex] = useState(0);
  const [nextSongIndex,setNextSongIndex] = useState(0);

  useEffect(()=> {
    setNextSongIndex(()=>{
      if (currentSongIndex + 1 > songs.length - 1) 
        return 0;
      else
        return currentSongIndex + 1;
    });
  },[currentSongIndex, songs.length])

  return (
    <div className="App">
      <Player
        currentSongIndex = {currentSongIndex}
        setCurrentSongIndex = {setCurrentSongIndex}
        nextSongIndex = {nextSongIndex}
        songs = {songs}
      />
    </div>
  );
}

export default App;
