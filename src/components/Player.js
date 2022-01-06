import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons"

const Player = ({setSongInfo, songInfo, currentSong,setIsPlaying,isPlaying, setCurrentSong,audioRef,timeUpdateHandler,songs, setSongs}) => {
        //Ref
        
    //Event Handlers

    const playSongHandler= () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
            
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
        
      }
    const inputHandler= (e) => {
        const drag =e.target.value;
        audioRef.current.currentTime= drag;
       setSongInfo({...songInfo, currentTime : drag})
    }

    const getTime= (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0"+ Math.floor(time % 60)).slice(-2)

        )
    }
    const skipTrackHandler= async (direction) => {
        let currentIndex= songs.findIndex((song) => song.id===currentSong.id);
        if (direction=== 'skip-forward'){
           await setCurrentSong(songs[(currentIndex + 1) % songs.length ]);
        }if(direction==='skip-back'){
            if((currentIndex -1) % songs.length=== -1) {
               await setCurrentSong(songs[songs.length-1]);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        if(isPlaying) audioRef.current.play()
    }
 
    //ADD THE STYLES
    const trackAnim= {
        transform: `translateX(${songInfo.animation}%)`
    }

    const songEndHandler= async () => {
        let currentIndex= songs.findIndex((song) => song.id===currentSong.id);
        await setCurrentSong(songs[(currentIndex + 1) % songs.length ]);
        if(!isPlaying) audioRef.current.play();
      }

 

    return (
        <div className="player">
            <div className="time-control">
           
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}className="track">
                <input onChange={inputHandler} onClick={inputHandler} min={0} maximum={songInfo.duration || 0} value={songInfo.currentTime} type="range"/>
                <div style={trackAnim}className="animate-track"></div>
                </div>
                <p>{getTime(songInfo.duration)}</p>
                </div>
            
            <div className="play-control">
                <FontAwesomeIcon onClick={()=> skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick= {playSongHandler}className="play-btn" size="2x"
                icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={()=> skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight}/>
            </div>
            <audio onEnded={songEndHandler} onTimeUpdate={timeUpdateHandler}  ref={audioRef}src={currentSong.audio}></audio>
        </div>

    )
}


export default Player ;