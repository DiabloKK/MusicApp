import classNames from 'classnames/bind';
import styles from './MusicPlayer.module.scss';
import moment from 'moment';
import { useContext } from 'react';
import { SongContext } from '~/hooks/SongContext';
import { useEffect, useRef, useState } from 'react';

import { useFileMP3Store } from '~/store/useFileMP3Store';

import { BsPlayCircleFill, BsSkipEndFill, BsSkipStartFill, BsShuffle, BsPauseCircleFill } from 'react-icons/bs';
import { IoIosRepeat } from 'react-icons/io';
import ModalDelete from '~/components/ModalDelete';
import MenuPlaylist from '~/components/MenuPlaylist';

import { CiVolumeHigh, CiVolumeMute } from 'react-icons/ci';
import { ProgressBar, ProgressBarColor } from '~/assets/Progressbar';
import { AddPlayListIcon, DeleteIcon, PlayQueueIcon, MusicLiBraryIcon } from '~/assets/icons';
import { Albums } from '~/API/Albums';

import 'tippy.js/themes/light.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);
function MusicPlayer({ fullView = false, hideOnClick = false }) {
    const context = useContext(SongContext);

    const {
        playMusic,
        togglePause,
        stopMusic,
        loadListMusic,
        loadQueueMusic,
        getState,
        jumpTimeMusic,
        loadRecentMusic,
        addRecentMusic,
        loadPlayListMusic,
    } = useFileMP3Store();
    const [check, setCheck] = useState(false);
    const [currentime, setCurrentime] = useState(0);
    const [percentPB, setPercentPB] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPause, setIsPause] = useState(false);
    const [isAddToQueue, setIsAddToQueue] = useState(true);
    const [isAddMusicLibrary, setIsAddMusicLibrary] = useState(true);
    const [isAddPlaylist, setIsAddPlaylist] = useState(true);
    const [isDelete, setIsDelete] = useState(true);
    const [visible, setVisible] = useState(false);
    const [isOpenD, setIsOpenD] = useState(false);

    const { changeVolume } = useFileMP3Store();
    const [isMute, setIsMute] = useState(false);

    const progressbarcolor = useRef();
    const songCurrent = useRef(1);
    const interval = useRef();
    const isRepeat = useRef(false);
    const isShuffle = useRef(false);
    const trackRef = useRef();
    const volumeRef = useRef();

    const route = useLocation();
    const path = route.pathname;

    const handleTogglePlayMusic = async () => {
        if (!isPlaying) {
            await playMusic(context.song.SourceFile);
            await addRecentMusic(context.song.SourceFile);
            setIsPlaying((isPlaying) => !isPlaying);
            runTime();
            setCheck(true);
        } else {
            if (!isPause) clearInterval(interval.current);
            else runTime();

            await togglePause();
            setIsPause(!isPause);
            setCheck(true);
        }
    };

    const getTotalTime = () => {
        const array = context.song.Duration.split(':');
        const totalTime = Number(array[0]) * 60 + Number(array[1]);
        return totalTime;
    };
    useEffect(() => {
        if (context.pathSong.includes('musicLibrary')) {
            setIsAddMusicLibrary(false);
            setIsAddToQueue(true);
            setIsAddPlaylist(true);
            if (context.pathSong.includes('artists') || context.pathSong.includes('albums')) {
                setIsDelete(false);
            }
        }
        if (context.pathSong.includes('playQueue')) {
            setIsAddMusicLibrary(false);
            setIsAddToQueue(false);
            setIsAddPlaylist(false);
        }
        if (context.pathSong.includes('playList')) {
            setIsAddMusicLibrary(false);
            setIsAddToQueue(true);
            setIsAddPlaylist(false);
        }
        if (context.pathSong === '/') {
            setIsAddMusicLibrary(true);
            setIsAddToQueue(true);
            setIsAddPlaylist(false);
        }
    }, [context.song]);

    useEffect(() => {
        if (isPlaying && !isPause) {
            const timeoutTime = setTimeout(async () => {
                let percent = Math.round((currentime * 100) / getTotalTime()) / 1000;
                setPercentPB(percent);
                progressbarcolor.current.style.cssText = `width: ${percent * 351}px`;
                setCurrentime(currentime + 1);
                if (currentime === getTotalTime() * 10) {
                    setCheck((check) => !check);
                }
            }, 100);

            return () => clearTimeout(timeoutTime);
        }
    });
    useEffect(() => {
        progressbarcolor.current.style.cssText = `width: ${percentPB * 351}px`;
    }, [fullView]);

    useEffect(() => {
        if (check && context.song.id !== undefined) {
            songCurrent.current = context.song.id;
            playRepeat();
        }
    }, [context.song]);

    useEffect(() => {
        setCurrentime(0);
        progressbarcolor.current.style.cssText = `width: 0px`;
    }, [context.song]);

    const nextSong = async () => {
        var Songs;

        if (path.includes('musicLibrary')) {
            Songs = await loadListMusic();
            const id = path.slice(22);
            if (path.includes('albums')) {
                Songs = context.ListAlbum.find((song) => song.id == id).Songs;
            }
            if (path.includes('artist')) {
                Songs = context.ListArtist[id - 1].Songs;
                console.log(Songs);
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

        let nextSong = songCurrent.current + 1;
        if (nextSong > Songs.length) nextSong = 1;
        context.ChangeSong(Songs[nextSong - 1]);
    };

    const backSong = async () => {
        var Songs;

        if (path.includes('musicLibrary')) {
            const id = path.slice(22);
            Songs = await loadListMusic();
            if (path.includes('albums')) {
                Songs = context.ListAlbum.find((song) => song.id == id).Songs;
                console.log(Songs);
            }
            if (path.includes('artist')) {
                Songs = context.ListArtist[id - 1].Songs;

                console.log(Songs);
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
        let nextSong = songCurrent.current - 1;
        if (nextSong < 1) nextSong = Songs.length;
        context.ChangeSong(Songs[nextSong - 1]);
    };

    const playRepeat = async () => {
        stopMusic();
        playMusic(context.song.SourceFile);
        if (!(path === '/')) addRecentMusic(context.song.SourceFile);
        setCurrentime(0);
        clearInterval(interval.current);

        runTime();
        setIsPlaying(true);
        setIsPause(false);
    };

    const runTime = async () => {
        var Songs;

        if (path.includes('musicLibrary')) {
            const id = path.slice(22);
            Songs = await loadListMusic();
            if (path.includes('albums')) {
                Songs = context.ListAlbum.find((song) => song.id == id).Songs;
            }
            if (path.includes('artist')) {
                Songs = context.ListArtist[id - 1].Songs;

                console.log(Songs);
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

        interval.current = setInterval(async () => {
            const state = await getState();
            if (state.localeCompare('STOP') === 0) {
                if (isRepeat.current === true) {
                    playRepeat();
                } else if (isShuffle.current === true) {
                    const random = Math.floor(Math.random() * 4) + 1;
                    console.log(random);
                    let nextSong = songCurrent.current + random;
                    if (nextSong > Songs.length) nextSong = 1;
                    context.ChangeSong(Songs[nextSong - 1]);
                } else {
                    nextSong();
                }
            }
        }, 1000);
    };

    const clickRepeat = (e) => {
        if (isRepeat.current === false) {
            e.target.style.backgroundColor = '#9c9db5';
        } else {
            e.target.style.backgroundColor = '';
        }
        isRepeat.current = !isRepeat.current;
    };

    const clickShuffle = (e) => {
        if (isShuffle.current === false) {
            e.target.style.backgroundColor = '#9c9db5';
        } else {
            e.target.style.backgroundColor = '';
        }
        isShuffle.current = !isShuffle.current;
    };
    const handleClickProgressBar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect();
        const percent = Math.round(e.clientX - trackRect.left) / trackRect.width;
        progressbarcolor.current.style.cssText = `width: ${percent * 351}px`;
        setCurrentime(percent * getTotalTime() * 10);
        console.log(percent * getTotalTime() * 10);
        console.log(Math.floor((percent * getTotalTime() * 10) / 10));
        jumpTimeMusic(Math.floor((percent * getTotalTime() * 10) / 10));
        setPercentPB(percent);
    };

    const handleChangeVolume = async (e) => {
        console.log(typeof e.target.value, e.target.value === 0);
        if (parseInt(e.target.value) === 0) setIsMute(true);
        else setIsMute(false);
        await changeVolume(e.target.value);
    };

    const handleClickVolume = async () => {
        if (isMute === false) {
            document.getElementById('volume').value = 0;
            changeVolume(0);
        } else {
            document.getElementById('volume').value = 50;
            changeVolume(50);
        }
        setIsMute(!isMute);
    };

    return (
        <>
            {!fullView ? (
                <div className={cx('musicPlayer')}>
                    <div className={cx('m-container')}>
                        <div className={cx('m-image')}>
                            <img src={`data:image/jpeg;base64,${context.song.Picture}`} alt="" />
                        </div>
                        <div className={cx('m-inf')}>
                            <p>{context.song.Title}</p>
                            <span>{context.song.Artist}</span>
                        </div>
                        <div className={cx('m-control')}>
                            <IoIosRepeat className={cx('left')} onClick={clickRepeat} />
                            <div className={cx('center')}>
                                <BsSkipStartFill className={cx('back')} onClick={backSong} />
                                <span onClick={handleTogglePlayMusic}>
                                    {isPlaying && !isPause ? (
                                        <BsPauseCircleFill className={cx('play')} />
                                    ) : (
                                        <BsPlayCircleFill className={cx('play')} />
                                    )}
                                </span>

                                <BsSkipEndFill className={cx('next')} onClick={nextSong} />
                            </div>
                            <BsShuffle className={cx('right')} onClick={clickShuffle} />
                        </div>
                    </div>
                    <div className={cx('m-progressbar')}>
                        <span className={cx('time')}>
                            <span className="">{moment.utc((currentime / 10) * 1000).format('mm:ss')}</span>
                        </span>
                        <div className={cx('progressbarnocolor')} ref={trackRef} onClick={handleClickProgressBar}>
                            <ProgressBar />
                            <div className={cx('progressbarcolor')} ref={progressbarcolor}>
                                <ProgressBarColor />
                            </div>
                        </div>
                        <span className={cx('time')}>
                            <span>{context.song.Duration}</span>
                        </span>
                    </div>
                    <div className={cx('container-vol')}>
                        <div className={cx('modeIcons')}>
                            <div onClick={handleClickVolume}>
                                {!isMute ? (
                                    <CiVolumeHigh className={cx('volume')} />
                                ) : (
                                    <CiVolumeMute className={cx('volume')} />
                                )}
                            </div>
                            <input type="range" id="volume" min="0" max="100" onChange={handleChangeVolume} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('musicPlayer_fullView')}>
                    <img src={`data:image/jpeg;base64,${context.song.Picture}`} alt="" />
                    <div className={cx('musicPlayerContainer_fullView')}>
                        <div className={cx('center')}>
                            <BsSkipStartFill className={cx('back')} onClick={backSong} />
                            <span onClick={handleTogglePlayMusic}>
                                {isPlaying && !isPause ? (
                                    <BsPauseCircleFill className={cx('play')} />
                                ) : (
                                    <BsPlayCircleFill className={cx('play')} />
                                )}
                            </span>

                            <BsSkipEndFill className={cx('next')} onClick={nextSong} />
                        </div>
                        <div className={cx('detailSong')}>
                            <img src={`data:image/jpeg;base64,${context.song.Picture}`} alt="" />
                            <div className={cx('m-inf')}>
                                <p>{context.song.Title}</p>
                                <span>{context.song.Artist}</span>
                            </div>
                        </div>

                        <div className={cx('listIcon')}>
                            {isAddToQueue && (
                                <Tippy delay={[0, 200]} content="Add to queue" placement="top" theme="light">
                                    <span
                                        className={cx('icon')}
                                        onClick={(event) => {
                                            setIsOpenD(true);
                                            event.stopPropagation();
                                        }}
                                    >
                                        <PlayQueueIcon />
                                    </span>
                                </Tippy>
                            )}
                            {isDelete && (
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
                            )}
                            {isAddPlaylist && (
                                <Tippy delay={[0, 200]} content="Add to Playlist" placement="top" theme="light">
                                    <MenuPlaylist
                                        items={Albums}
                                        visible={visible}
                                        onClickOutside={() => setVisible(false)}
                                    >
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
                            {isOpenD && <ModalDelete setIsOpen={setIsOpenD} />}
                            {isAddMusicLibrary && (
                                <Tippy delay={[0, 200]} content="Add to Library" placement="top" theme="light">
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

                        <div className={cx('m-progressbar')}>
                            <span className={cx('time')}>
                                <span className="">{moment.utc((currentime / 10) * 1000).format('mm:ss')}</span>
                            </span>
                            <div className={cx('progressbarnocolor')} ref={trackRef} onClick={handleClickProgressBar}>
                                <ProgressBar />
                                <div className={cx('progressbarcolor')} ref={progressbarcolor}>
                                    <ProgressBarColor />
                                </div>
                            </div>
                            <span className={cx('time')}>
                                <span>{context.song.Duration}</span>
                            </span>
                        </div>
                        <div className={cx('modeIcons')}>
                            <IoIosRepeat className={cx('left')} onClick={clickRepeat} />
                            <BsShuffle className={cx('right')} onClick={clickShuffle} />
                            <div className={cx('volume-control')}>
                                <span
                                    onMouseEnter={() => {
                                        console.log(volumeRef.current);
                                        volumeRef.current.style.cssText = `display: flex;`;
                                    }}
                                >
                                    {!isMute ? (
                                        <CiVolumeHigh className={cx('volume')} onClick={handleClickVolume} />
                                    ) : (
                                        <CiVolumeMute className={cx('volume')} onClick={handleClickVolume} />
                                    )}
                                </span>

                                <div
                                    className={cx('container-volume')}
                                    ref={volumeRef}
                                    onMouseLeave={() => {
                                        volumeRef.current.style.cssText = `display: none;`;
                                    }}
                                >
                                    <input type="range" id="volume" min="0" max="100" onChange={handleChangeVolume} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MusicPlayer;
