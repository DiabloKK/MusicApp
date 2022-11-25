import classNames from 'classnames/bind';
import styles from './Audio.module.scss';
import { AddPlayListIcon, AddPlayQueueIcon, DeleteIcon } from '~/assets/icons';

import { SongContext } from '~/hooks/SongContext';
import { useContext } from 'react';
const cx = classNames.bind(styles);

function Audio({ song }) {
    const context = useContext(SongContext);
    return (
        <div
            className={cx('Audio')}
            onClick={() => {
                context.ChangeSong(song);
            }}
        >
            <div className={cx('in4-Audio')}>
                <i className={cx('STT')}>{song.id + 1}</i>
                <img src={song.imgSrc} alt="" />
                <div className={cx('name')}>
                    <h4>{song.artist}</h4>
                    <p>{song.songName}</p>
                </div>
                <p className={cx('duration')}> {song.duration}</p>
            </div>
            <div className={cx('listIcon')}>
                <span
                    className={cx('icon')}
                    onClick={(event) => {
                        alert(';;;;');
                        event.stopPropagation();
                    }}
                >
                    <AddPlayQueueIcon />
                </span>
                <span className={cx('icon')}>
                    <DeleteIcon />
                </span>
                <span className={cx('icon')}>
                    <AddPlayListIcon />
                </span>
            </div>
        </div>
    );
}

export default Audio;
