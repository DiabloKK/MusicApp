import classNames from 'classnames/bind';
import styles from './AudioList.module.scss';
import Audio from '../Audio';
import { SongContext } from '~/hooks/SongContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useFileMP3Store } from '~/store/useFileMP3Store';
import { useLocation } from 'react-router-dom';

import { useState } from 'react';
import { PlayList } from '~/API/PlayList';
import { Albums, Artists } from '~/API/Albums';

const cx = classNames.bind(styles);

function AudioList({ type = 'musicLibrary' }) {
    const { loadListMusic, loadRecentMusic, loadQueueMusic } = useFileMP3Store();
    const [songs, setSongs] = useState([]);
    const context = useContext(SongContext);

    const route = useLocation();
    const path = route.pathname;

    useEffect(() => {
        const load = async () => {
            var list;
            switch (type) {
                case 'home':
                    list = await loadRecentMusic();
                    list.reverse();
                    break;
                case 'queue':
                    list = await loadQueueMusic();
                    break;
                case 'playlist':
                case 'albums':
                case 'artist':
                    return;
                default:
                    list = await loadListMusic();
            }

            setSongs(list);
        };

        load();
    }, [context.count]);

    useEffect(() => {
        //console.log(path);
        if (path.includes('musicLibrary/albums/@')) {
            const id = path.slice(22);
            setSongs(Albums[id-1].Songs);
        }
        if (path.includes('musicLibrary/artists/@')) {
            const id = path.slice(23);
            setSongs(Artists[id-1].Songs);
        }
        if (path.includes('playList/@')) {
            const id = path.slice(11);
            console.log(id);
            console.log(PlayList.find((song) => song.id === id).Songs);
            setSongs(PlayList.find((song) => song.id === id).Songs);
        }
    }, []);
    return (
        <div className={cx('AudioList')}>
            {songs.length && songs.map((song) => <Audio key={song.id} song={song} />)}
        </div>
    );
}

export default AudioList;
