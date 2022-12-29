import Header from '~/components/Header';
import classNames from 'classnames/bind';
import { imageDefault } from '~/API/imageDefault';

import styles from './PlayList.module.scss';
import AblumList from '~/components/AlbumList';
import { Routes, Route } from 'react-router-dom';
import AudioList from '~/components/AudioList';
import { useState, useEffect } from 'react';
import { useFileMP3Store } from '~/store/useFileMP3Store';
import { SongContext } from '~/hooks/SongContext';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function Playlist() {
    const name = 'playList';
    const [Albums, setAlbums] = useState([]);
    const context = useContext(SongContext);

    return (
        <div className={cx('Playlist')}>
            <Header name="Playlist" />
            <div className={cx('content')}>
                <Routes>
                    <Route path="/" element={<AblumList name={name} Albums={context.ListPlaylist} />} />
                    <Route path="/@:idAblum" element={<AudioList type="playlist" />} />
                </Routes>
            </div>
        </div>
    );
}

export default Playlist;
