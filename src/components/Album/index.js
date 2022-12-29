import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Album.module.scss';

const cx = classNames.bind(styles);

function Album({ Album, name = 'albums' }) {
    console.log(name, `${name === 'albums' ? '/musicLibrary/albums' : '/playList'}`);
    return (
        // <Link to={`/musicLibrary/albums/@${Album.id}`} className={cx('Album')}>
        <Link to={`${name === 'albums' ? '/musicLibrary/albums' : '/playList'}/@${Album.id}`} className={cx('Album')}>
            <img src={`data:image/jpeg;base64,${Album.imgSrc}`} alt={Album.albumName} />
            <h4>{Album.albumName}</h4>
            <i>{Album.artist}</i>
        </Link>
    );
}

export default Album;
    