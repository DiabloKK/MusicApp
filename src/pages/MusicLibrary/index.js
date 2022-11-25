import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './MusicLibrary.module.scss';
import Slider from '~/components/Slider';
import Menu from '~/components/Menu';
import AudioList from '~/components/AudioList';

import { Routes, Route } from 'react-router-dom';
import AblumList from '~/components/AlbumList';
import ArtistList from '~/components/ArtistList';

const cx = classNames.bind(styles);

function MusicLibrary() {
    return (
        <div className={cx('Home')}>
            <Header />
            <Slider />
            <Menu />
            <div className={cx('content')}>
                <Routes>
                    <Route path="/" element={<AudioList />} />
                    <Route path="/albums" element={<AblumList />} />
                    <Route path="/albums/@:idAblum" element={<AudioList />} />
                    <Route path="/artists" element={<ArtistList />} />
                    <Route path="/artists/@:idAblum" element={<AudioList />} />
                </Routes>
            </div>
        </div>
    );
}

export default MusicLibrary;
