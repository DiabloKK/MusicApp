import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Album.module.scss';

const cx = classNames.bind(styles);

function Album({ Album, type = 'albums' }) {
    console.log(type, `${type === 'albums' ? '/musicLibrary/albums' : '/playList'}`);
    return (
        // <Link to={`/musicLibrary/albums/@${Album.id}`} className={cx('Album')}>
        <Link to={`${type === 'albums' ? '/musicLibrary/albums' : '/playList'}/@${Album.id}`} className={cx('Album')}>
            <img src={Album.imgSrc} alt={Album.albumName} />
            <h4>{Album.albumName}</h4>
            <i>{Album.artist}</i>
        </Link>
    );
}

export default Album;
    