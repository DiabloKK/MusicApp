import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './PlayList.module.scss';
import AblumList from '~/components/AlbumList';

const cx = classNames.bind(styles);

function Playlist() {
    return (
        <div className={cx('Playlist')}>
            <Header name="Playlist" />
            <div className={cx('content')}>
                <AblumList />
            </div>
        </div>
    );
}

export default Playlist;
