import classNames from 'classnames/bind';
import styles from './ArtistList.module.scss';
import { SongContext } from '~/hooks/SongContext';
import { useContext } from 'react';
import Artist from '../Artist';

const cx = classNames.bind(styles);
function ArtistList() {
    const context = useContext(SongContext);
    return (
        <div className={cx('ArtistList')}>
            {context.ListArtist.map((ablum) => (
                <Artist key={ablum.id} Artist={ablum} />
            ))}
        </div>
    );
}

export default ArtistList;
