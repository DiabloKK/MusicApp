import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './MusicLibrary.module.scss';
import Slider from '~/components/Slider';
import Menu from '~/components/Menu';
import AudioList from '~/components/AudioList';
import { useFileMP3Store } from '~/store/useFileMP3Store';

import { Routes, Route } from 'react-router-dom';
import AblumList from '~/components/AlbumList';
import ArtistList from '~/components/ArtistList';
import { SongContext } from '~/hooks/SongContext';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function MusicLibrary() {
    const context = useContext(SongContext);
    const { loadListMusic } = useFileMP3Store();
    window.Songs = loadListMusic();

    return (
        <div className={cx('Home')}>
            <Header />
            <Slider />
            <Menu />
            <div className={cx('content')}>
                <Routes>
                    <Route path="/" element={<AudioList />} />
                    <Route path="/albums" element={<AblumList Albums={context.ListAlbum} />} />
                    <Route path="/albums/@:idAblum" element={<AudioList type="albums" />} />
                    <Route path="/artists" element={<ArtistList />} />
                    <Route path="/artists/@:idAblum" element={<AudioList type="artists" />} />
                </Routes>
            </div>
        </div>
    );
}

export default MusicLibrary;
