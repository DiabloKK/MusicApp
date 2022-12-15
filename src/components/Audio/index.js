import classNames from 'classnames/bind';
import styles from './Audio.module.scss';
import { AddPlayListIcon, AddPlayQueueIcon, DeleteIcon } from '~/assets/icons';

import { SongContext } from '~/hooks/SongContext';
import { useContext } from 'react';
import { CiVolumeHigh } from 'react-icons/ci';
const cx = classNames.bind(styles);

function Audio({ song }) {
    const context = useContext(SongContext);

    return (
        <div
            className={cx(`Audio`, {
                active: context.pathSong === window.location.pathname && context.song.id === song.id,
            })}
            onClick={() => {
                context.ChangeSong(song);
                console.log(window.location.pathname);
                context.ChangePathSong(window.location.pathname);

                console.log(`Audio ${context.pathSong === window.location.pathname ? 'active' : ''}`);
            }}
        >
            <div className={cx('in4-Audio')}>
                <i className={cx('STT')}>{song.id}</i>
                <img src={`data:image/jpeg;base64,${song.Picture}`} alt="" />
                <div className={cx('name')}>
                    <h4>{song.Title}</h4>
                    <p>{song.Artist}</p>
                </div>
                <p className={cx('duration')}> {song.Duration}</p>
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
