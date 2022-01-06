import React from 'react';

const LibrarySong = ({songs,song, setCurrentSong,audioRef,isPlaying, id, setSongs,currentSong}) => {
    const songSelectHandler = async () => {
   await setCurrentSong(song);
   audioRef.current.play();
   const newSongs= songs.map((song) => {
       if(song.id===id){
           return { ...song, active:true,}
       }else{
           return {...song, active:false,}
       }

   })
   setSongs(newSongs)
}
    return (
        <div className={`library-song ${song.id === currentSong.id ? "selected" : ""}`} onClick={songSelectHandler} >
            <img src={song.cover} alt={song.name}></img>
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
            </div>
    )
}

export default LibrarySong;

