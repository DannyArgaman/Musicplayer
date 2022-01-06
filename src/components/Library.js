import React from 'react';
import LibrarySong from './LibrarySong'

const Library= ({libraryStatus, setLibraryStatus, setsongs, songs,setCurrentSong, audioRef,setSongs,isPlaying,currentSong}) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library': ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
            {songs.map((song) =>(<LibrarySong isPlaying={isPlaying} setSongs={setSongs} id= {song.id}song={song} songs={songs} setCurrentSong={setCurrentSong} currentSong={currentSong}
             audioRef={audioRef}/>))}
            </div>
        </div>
    )
}

export default Library;