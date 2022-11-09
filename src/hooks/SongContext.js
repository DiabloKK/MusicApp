import { useState, createContext } from 'react';
import { Songs } from '~/API/Songs';
const SongContext = createContext();

function SongProvider({ children }) {
    const [song, setSong] = useState(Songs[0]);
    console.log(song);
    const ChangeSong = (songCurrent) => {
        console.log(songCurrent);
        setSong(songCurrent);
        console.log(song);
    };

    const value = {
        song,
        ChangeSong,
    };

    return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
}

export { SongContext, SongProvider };
