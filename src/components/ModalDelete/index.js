import classNames from 'classnames/bind';
import styles from './ModalDelete.module.scss';
import { useFileMP3Store } from '~/store/useFileMP3Store';
import { SongContext } from '~/hooks/SongContext';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { useState, useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

const ModalDelete = ({ setIsOpen, song }) => {
    const {
        deleteMusic,
        loadListMusic,
        loadRecentMusic,
        loadLoveMusic,
        deleteQueueMusic,
        deleteRecentMusic,
        deleteMusicPlaylist,
        loadPlayListMusic,
        loadQueueMusic,
    } = useFileMP3Store();
    const [songs, setSongs] = useState([]);
    const context = useContext(SongContext);

    const route = useLocation();
    const path = route.pathname;

    useEffect(() => {
        const type = '';
        const load = async () => {
            var Songs;

            if (path.includes('musicLibrary')) {
                Songs = await loadListMusic();
                const id = path.slice(22);
                if (path.includes('albums')) {
                    Songs = context.ListAlbum.find((song) => song.id == id).Songs;
                }
            }
            if (path.includes('playQueue')) {
                Songs = await loadQueueMusic();
            }
            if (path.includes('playList')) {
                const id = path.slice(11);
                Songs = await loadPlayListMusic(id);
            }
            if (path === '/') {
                Songs = await loadRecentMusic();
                Songs.reverse();
            }
            console.log(Songs);
            setSongs(Songs);
        };
        load();
    }, []);

    const nextSong = async () => {
        if (context.pathSong === path && context.song.id === song.id) {
            if (song.id === songs.length) {
                context.ChangeSong(songs[0]);
            } else {
                songs[song.id] = { ...songs[song.id], id: song.id };
                context.ChangeSong(songs[song.id]);
            }
        }
    };

    return (
        <>
            <div className={cx('darkBG')} onClick={() => setIsOpen(false)} />

            <div className={cx('centered')}>
                <div className={cx('modal')}>
                    <div className={cx('modalHeader')}>
                        <h5 className={cx('heading')}>Dialog</h5>
                    </div>
                    {/* <button className={cx('loseBtn')} onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: '-3px' }} />
                    </button> */}
                    <div className={cx('modalContent')}>Are you sure you want to delete the item?</div>
                    <div className={cx('modalActions')}>
                        <div className={cx('actionsContainer')}>
                            <button
                                className={cx('deleteBtn')}
                                onClick={(e) => {
                                    if (path.includes('musicLibrary')) {
                                        deleteMusic(song.SourceFile);
                                        if(path.includes('albums')) {
                                            
                                        }
                                    }
                                    if (path.includes('playQueue')) {
                                        deleteQueueMusic(song.SourceFile);
                                    }
                                    if (path.includes('playList')) {
                                        const id = path.slice(11);
                                        console.log(id);
                                        var name = context.ListPlaylist.find((song) => song.id === id).albumName;
                                        deleteMusicPlaylist(name, song.SourceFile);
                                    }
                                    if (path === '/') {
                                        deleteRecentMusic(song.SourceFile);
                                    }
                                    let count = context.count + 1;
                                    context.ChangeCount(count);

                                    nextSong();
                                    setIsOpen(false);
                                    e.stopPropagation();
                                }}
                            >
                                Delete
                            </button>
                            <button className={cx('cancelBtn')} onClick={() => setIsOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalDelete;
