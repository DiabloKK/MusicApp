import { useState, createContext } from 'react';
import { Songs } from '~/API/Songs';
const SongContext = createContext();

function SongProvider({ children }) {
    const [song, setSong] = useState(Songs[0]);

    const ChangeSong = (songCurrent) => {
        setSong(songCurrent);
    };

    const value = {
        song,
        ChangeSong,
    };

    return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
}

export { SongContext, SongProvider };
