import classNames from 'classnames/bind';
import styles from './ArtistList.module.scss';
import { Albums } from '~/API/Albums';
import Artist from '../Artist';


const cx = classNames.bind(styles);

function ArtistList() {
    return (
        <div className={cx('ArtistList')}>
            {Albums.map((ablum) => (
                <Artist key={ablum.id} Artist={ablum} />
            ))}
        </div>
    );
}

export default ArtistList;
