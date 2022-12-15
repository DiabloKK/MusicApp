import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './PlayList.module.scss';
import AblumList from '~/components/AlbumList';
import { Routes, Route } from 'react-router-dom';

const cx = classNames.bind(styles);

function Playlist() {
    const type = 'playList';
    return (
        <div className={cx('Playlist')}>
            <Header name="Playlist" />
            <div className={cx('content')}>
                <Routes>
                    <Route path="/" element={<AblumList />} />
                    <Route path="/@:idAblum" element={<AblumList type={type} />} />
                </Routes>
            </div>
        </div>
    );
}

export default Playlist;
