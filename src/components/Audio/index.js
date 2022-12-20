import classNames from 'classnames/bind';
import styles from './Audio.module.scss';
import { AddPlayListIcon, AddPlayQueueIcon, DeleteIcon } from '~/assets/icons';

import 'tippy.js/themes/light.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

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
                <Tippy delay={[0, 200]} content="Add queue" placement="top" theme="light">
                    <span
                        className={cx('icon')}
                        onClick={(event) => {
                            alert(';;;;');
                            event.stopPropagation();
                        }}
                    >
                        <AddPlayQueueIcon />
                    </span>
                </Tippy>
                <Tippy delay={[0, 200]} content="Delete" placement="top" theme="light">
                    <span className={cx('icon')}>
                        <DeleteIcon />
                    </span>
                </Tippy>
                <Tippy delay={[0, 200]} content="Add Playlist" placement="top" theme="light">
                    <span className={cx('icon')}>
                        <AddPlayListIcon />
                    </span>
                </Tippy>
            </div>
        </div>
    );
}

export default Audio;
