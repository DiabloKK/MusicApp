import classNames from 'classnames/bind';
import styles from './Audio.module.scss';
import { HiDotsHorizontal } from 'react-icons/hi';
import { SongContext } from '~/hooks/SongContext';
import { useContext } from 'react';
const cx = classNames.bind(styles);

function Audio({ song }) {
    const context = useContext(SongContext);
    return (
        <div className={cx('Audio')} onClick={() => context.ChangeSong(song)}>
            <div className={cx('in4-Audio')}>
                <i className={cx('STT')}>{song.id}</i>
                <img src={song.imgSrc} alt="" />
                <div className={cx('name')}>
                    <h4>{song.artist}</h4>
                    <p>{song.songName}</p>
                </div>
                <p className={cx('duration')}> {song.duration}</p>
            </div>
            <div className={cx('icons')}>
                <HiDotsHorizontal className={cx('icon')} />
            </div>
        </div>
    );
}

export default Audio;
