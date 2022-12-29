import classNames from 'classnames/bind';
import styles from './AlbumList.module.scss';
import Album from '../Album';
import { PlayList } from '~/API/PlayList';
import { Albums } from '~/API/Albums';

const cx = classNames.bind(styles);

function AblumList({type = 'albums', name = 'albums' }) {

    console.log(name);

    const handle = (album) => {
      return <Album key={album.id} name={name} Album={album} />
    }

    return (
        <div className={cx('AlbumList')}>
            {type === 'playlist' ? PlayList.map(handle) : Albums.map(handle)}
        </div>
    );
}

export default AblumList;
