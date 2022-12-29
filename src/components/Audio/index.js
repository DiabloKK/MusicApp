import classNames from 'classnames/bind';
import styles from './Audio.module.scss';
import { AddPlayListIcon, AddPlayQueueIcon, DeleteIcon, PlayQueueIcon, MusicLiBraryIcon } from '~/assets/icons';
import MenuPlaylist from '~/components/MenuPlaylist';
import { useState, useEffect } from 'react';
import { useFileMP3Store } from '~/store/useFileMP3Store';
import { useLocation } from 'react-router-dom';

import 'tippy.js/themes/light.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { SongContext } from '~/hooks/SongContext';
import { useContext } from 'react';
import { PlayList } from '~/API/PlayList';
import ModalDelete from '~/components/ModalDelete';

const cx = classNames.bind(styles);

function Audio({ song, ad }) {
    const context = useContext(SongContext);
    const [visible, setVisible] = useState(false);
    const [isOpenD, setIsOpenD] = useState(false);
    const [isAddToQueue, setIsAddToQueue] = useState(true);
    const [isAddMusicLibrary, setIsAddMusicLibrary] = useState(true);
    const [isAddPlaylist, setIsAddPlaylist] = useState(true);

    const { addQueueMusic } = useFileMP3Store();

    const route = useLocation();
    const path = route.pathname;

    useEffect(() => {

        if (path.includes('musicLibrary')) {
            setIsAddMusicLibrary(false);
            setIsAddToQueue(true);
            setIsAddPlaylist(true);
        }
        if (path.includes('playQueue')) {
            setIsAddMusicLibrary(false);
            setIsAddToQueue(false);
            setIsAddPlaylist(false);
        }
        if (path.includes('playList')) {
            setIsAddMusicLibrary(false);
            setIsAddToQueue(true);
            setIsAddPlaylist(false);
        }
        if (path === '/') {
            setIsAddMusicLibrary(true);
            setIsAddToQueue(true);
            setIsAddPlaylist(false);
        }
    }, []);

    return (
        <div
            className={cx(`Audio`, {
                active: context.pathSong === path && context.song.id === song.id,
            })}
            onClick={() => {
                context.ChangeSong(song);
                context.ChangePathSong(path);

                console.log(`Audio ${context.pathSong === path ? 'active' : ''}`);
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
                {isAddToQueue && (
                    <Tippy delay={[0, 200]} content="Add queue" placement="top" theme="light">
                        <span
                            className={cx('icon')}
                            onClick={(event) => {
                                addQueueMusic(song.SourceFile);
                                event.stopPropagation();
                            }}
                        >
                            <PlayQueueIcon />
                        </span>
                    </Tippy>
                )}
                <Tippy delay={[0, 200]} content="Delete" placement="top" theme="light">
                    <span
                        className={cx('icon')}
                        onClick={(event) => {
                            setIsOpenD(true);
                            event.stopPropagation();
                        }}
                    >
                        <DeleteIcon />
                    </span>
                </Tippy>
                {isAddPlaylist && (
                    <Tippy delay={[0, 200]} content="Add Playlist" placement="top" theme="light">
                        <MenuPlaylist items={PlayList} visible={visible} onClickOutside={() => setVisible(false)}>
                            <span
                                className={cx('icon')}
                                onClick={(event) => {
                                    setVisible((visible) => !visible);
                                    event.stopPropagation();
                                }}
                            >
                                <AddPlayListIcon />
                            </span>
                        </MenuPlaylist>
                    </Tippy>
                )}
                {isOpenD && <ModalDelete setIsOpen={setIsOpenD} song={song} />}
                {isAddMusicLibrary && (
                    <Tippy delay={[0, 200]} content="Add Library" placement="top" theme="light">
                        <span
                            className={cx('icon')}
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <MusicLiBraryIcon />
                        </span>
                    </Tippy>
                )}
            </div>
        </div>
    );
}

export default Audio;
