import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Artist.module.scss';

const cx = classNames.bind(styles);

function Artist({ Artist }) {
    return (
        <Link to={`/musicLibrary/artists/@${Artist.id}`} className={cx('Artist')}>
            <img src={Artist.imgSrc} alt={Artist.albumName} />
            <h4>{Artist.artist}</h4>
            <i>artist</i>
        </Link>
    );
}

export default Artist;
