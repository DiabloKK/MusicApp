import { useState, createContext, useEffect } from 'react';
import { useFileMP3Store } from '~/store/useFileMP3Store';
const SongContext = createContext();

function SongProvider({ children }) {
    const { loadListMusic } = useFileMP3Store();
    const [song, setSong] = useState([]);
    const [pathSong, setPathSong] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        const load = async () => {
            const list = await loadListMusic();
            setSong(list[0]);
        };

        load();
    }, []);

    const ChangeSong = (songCurrent) => {
        setSong(songCurrent);
    };
    const ChangePathSong = (pathSongCurrent) => {
        setPathSong(pathSongCurrent);
    };
    const ChangeCount = (count) => {
        setCount(count);
    };
    const value = {
        count,
        song,
        pathSong,
        ChangeCount,
        ChangeSong,
        ChangePathSong,
    };

    return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
}

export { SongContext, SongProvider };
