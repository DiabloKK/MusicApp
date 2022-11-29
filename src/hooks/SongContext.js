import { useState, createContext, useEffect } from 'react';
import { useFileMP3Store } from '~/store/useFileMP3Store';
const SongContext = createContext();

function SongProvider({ children }) {

    const {loadListMusic} = useFileMP3Store();
    const [song, setSong] = useState([]);


    useEffect(() => {
        const load = async () => {
            const list = await loadListMusic();
            setSong(list[0]);
        }
    
        load();
      }, []);

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
