import classNames from 'classnames/bind';
import styles from './AlbumList.module.scss';
import { Albums } from '~/API/Albums';
import Album from '../Album';

const cx = classNames.bind(styles);

function AblumList({ type = 'albums' }) {
    console.log(type);
    return (
        <div className={cx('AlbumList')}>
            {Albums.map((ablum) => (
                <Album key={ablum.id} Album={ablum} type={type} />
            ))}
        </div>
    );
}

export default AblumList;
