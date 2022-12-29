import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './PlayList.module.scss';
import AblumList from '~/components/AlbumList';
import { Routes, Route } from 'react-router-dom';
import AudioList from '~/components/AudioList';
const cx = classNames.bind(styles);

function Playlist() {
    const name = 'playList';
    return (
        <div className={cx('Playlist')}>
            <Header name="Playlist" />
            <div className={cx('content')}>
                <Routes>
                    <Route path="/" element={<AblumList type="playlist" name={name}/>} />
                    <Route path="/@:idAblum" element={<AudioList type='playlist' />} />
                </Routes>
            </div>
        </div>
    );
}

export default Playlist;
