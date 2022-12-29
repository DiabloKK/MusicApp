import classNames from 'classnames/bind';
import styles from './AudioList.module.scss';
import Audio from '../Audio';
import { SongContext } from '~/hooks/SongContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useFileMP3Store } from '~/store/useFileMP3Store';

import { useState } from 'react';
import { Albums } from '~/API/Albums';

const cx = classNames.bind(styles);

function AudioList({ type = 'musicLibrary' }) {
    const { loadListMusic, loadRecentMusic, loadQueueMusic } = useFileMP3Store();
    const [songs, setSongs] = useState([]);
    const context = useContext(SongContext);

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
                    return;
                default:
                    list = await loadListMusic();
            }

            setSongs(list);
        };

        load();
    }, [context.count]);

    useEffect(() => {
        const path = window.location.pathname;
        //console.log(path);
        if (path.includes('musicLibrary/albums/@')) {
            const id = path.slice(22);
            console.log(Albums.find((song) => song.id === id).Songs);
            setSongs(Albums.find((song) => song.id === id).Songs);
        }
        if (path.includes('musicLibrary/artists/@')) {
            const id = path.slice(23);
            console.log(Albums.find((song) => song.id === id).Songs);
            setSongs(Albums.find((song) => song.id === id).Songs);
        }
        if (path.includes('playList/@')) {
            const id = path.slice(11);
            console.log(id);
            console.log(Albums.find((song) => song.id === id).Songs);
            setSongs(Albums.find((song) => song.id === id).Songs);
        }
    }, []);
    return (
        <div className={cx('AudioList')}>
            {songs.length && songs.map((song) => <Audio key={song.id} song={song} />)}
        </div>
    );
}

export default AudioList;
