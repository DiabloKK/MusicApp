import classNames from 'classnames/bind';
import styles from './AlbumList.module.scss';
import Album from '../Album';
import { Albums } from '~/API/Albums';

const cx = classNames.bind(styles);

function AblumList({ name = 'albums' }) {
    console.log(name);
    return (
        <div className={cx('AlbumList')}>
            {Albums.map((ablum) => (
                <Album key={ablum.id} name={name} Album={ablum} />
            ))}
        </div>
    );
}

export default AblumList;
