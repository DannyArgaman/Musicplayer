import React, {useState, useRef} from 'react';
import './styles/app.scss'
import Player from './components/Player'
import Song from './components/Song'
import chillHop from './util'
import Library from './components/Library'
import Nav from './components/Nav'


function App() {
  const audioRef= useRef(null);
  //State
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong]= useState(songs[0]);
  const [isPlaying, setIsPlaying]= useState(false);
  const [songInfo, setSongInfo]= useState({
    currentTime: 0,
    duration: 0,
    animationPercentage:0,
})


const [libraryStatus, setLibraryStatus]= useState(false);
const timeUpdateHandler= (e) => {
  const current= e.target.currentTime;
  const duration= e.target.duration;
  const roundedCurrent= Math.round(current);
  const ruounedDuration= Math.round(duration);
  const animation= Math.round((roundedCurrent/ ruounedDuration)*100);
  setSongInfo({...songInfo, currentTime:current,
  duration:duration, animation:animation})
};
const songEndHandler= async () => {
  let currentIndex= songs.findIndex((song) => song.id===currentSong.id);
  await setCurrentSong(songs[(currentIndex + 1) % songs.length ]);
  if(!isPlaying) audioRef.current.play();
}





  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav  libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song isPlaying={isPlaying} currentSong={currentSong}/>
      <Player timeUpadaeHandler={timeUpdateHandler}songs={songs} setSong={setSongs}songInfo={songInfo } setSongInfo={setSongInfo} audioRef= {audioRef} songs={songs} setSongs="setSongs" isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong}/>
      <Library libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} setSongs={setSongs}isPlaying={isPlaying} timeUpdateHandler={timeUpdateHandler} audioRef={audioRef} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong}/>
      <audio onEnded={songEndHandler} onTimeUpdate={timeUpdateHandler}  ref={audioRef}src={currentSong.audio}></audio>
    </div>
  );
}


export default App;
