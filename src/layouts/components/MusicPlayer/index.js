import classNames from 'classnames/bind';
import styles from './MusicPlayer.module.scss';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { BsPlayCircleFill, BsSkipEndFill, BsSkipStartFill, BsShuffle, BsPauseCircleFill } from 'react-icons/bs';
import { IoIosRepeat } from 'react-icons/io';
import { CiVolumeHigh } from 'react-icons/ci';
import { useFileMP3Store } from '~/store/useFileMP3Store';

import { ProgressBar, ProgressBarColor } from '~/assets/Progressbar';
import { AddPlayListIcon, AddPlayQueueIcon, MusicLiBraryIcon } from '~/assets/icons';
import { useContext } from 'react';
import { SongContext } from '~/hooks/SongContext';


const cx = classNames.bind(styles);
function MusicPlayer({ song , fullView = false }) {

    const context = useContext(SongContext);

    const {playMusic, togglePause, stopMusic, loadListMusic, getState, deleteRecentMusic,
         createPlayList, addMusicPlayList} = useFileMP3Store();

    const [currentime, setCurrentime] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isPause, setIsPause] = useState(false);
    
    const progressbarcolor = useRef();
    const songCurrent = useRef(1);
    const interval = useRef();
    const isRepeat = useRef(false); 
    const isShuffle = useRef(false);

    const handleTogglePlayMusic = async () => {
        if(!isPlaying) {
            await playMusic(song.SourceFile);
            setIsPlaying((isPlaying) => !isPlaying);
            runTime();
        } else {
            if(!isPause) clearInterval(interval.current);
            else runTime();

            await togglePause();
            setIsPause(!isPause);
        }
    };

    const getTotalTime = () => {
        const array = song.Duration.split(":");
        const totalTime = Number(array[0]) * 60 + Number(array[1]);
        return totalTime;
    } 

    useEffect(() => {
        if (isPlaying && !isPause) {
            const timeoutTime = setTimeout(async () => {
                
                let percent = Math.round((currentime * 100) / getTotalTime()) / 1000;

                progressbarcolor.current.style.cssText = `width: ${percent * 351}px`;
                setCurrentime(currentime + 1);
            }, 100);

            return () => clearTimeout(timeoutTime);
        }
    });

    useEffect(() => {
        if(songCurrent.current !== song.id && song.id !== undefined) {
            songCurrent.current = song.id;
            playRepeat();
        } 
    });

    useEffect(() => {
        setCurrentime(0);
        progressbarcolor.current.style.cssText = `width: 0px`;
    }, [song]);


    const nextSong = async () => {
        const Songs = await loadListMusic();
        let nextSong = songCurrent.current + 1;
        if(nextSong > Songs.length) nextSong = 1;
        context.ChangeSong(Songs[nextSong-1]);
    }

    const backSong = async () => {
        const Songs = await loadListMusic();
        let nextSong = songCurrent.current - 1;
        if(nextSong < 1) nextSong = Songs.length;
        context.ChangeSong(Songs[nextSong-1]);
    }

    const playRepeat = async () => {
        stopMusic();
        playMusic(song.SourceFile);
        setCurrentime(0);
        clearInterval(interval.current);
        runTime();
        setIsPlaying(true);
        setIsPause(false);
    } 


    const runTime = async () => {
        const Songs = await loadListMusic();
        interval.current = setInterval(async () => {
            const state = await getState();
            if(state.localeCompare("STOP") === 0) {
                if(isRepeat.current === true) {
                    playRepeat();
                } else if (isShuffle.current === true) {
                    const random = Math.floor(Math.random() * 4) + 1;
                    console.log(random);
                    let nextSong = songCurrent.current + random;
                    if(nextSong > Songs.length) nextSong = 1;
                    context.ChangeSong(Songs[nextSong-1]);
                } else {
                    nextSong();
                }
            }
        }, 1000);
    }


    const clickRepeat = (e) => {
        if(isRepeat.current === false) {
            e.target.style.backgroundColor = "#9c9db5";
        } else {
            e.target.style.backgroundColor = "";
        }
        isRepeat.current = !isRepeat.current;
    }
    
    const clickShuffle = (e) => {
        if(isShuffle.current === false) {
            e.target.style.backgroundColor = "#9c9db5";
        } else {
            e.target.style.backgroundColor = "";
        }
        isShuffle.current = !isShuffle.current;
    }

    return (
        <>
            {!fullView ? (
                <div className={cx('musicPlayer')}>
                    <div className={cx('m-container')}>
                        <div className={cx('m-image')}>
                            <img src={`data:image/jpeg;base64,${song.Picture}`} alt="" />
                        </div>
                        <div className={cx('m-inf')}>
                            <p>{song.Title}</p>
                            <span>{song.Artist}</span>
                        </div>
                        <div className={cx('m-control')}>
                            <IoIosRepeat className={cx('left')} onClick={clickRepeat} />
                            <div className={cx('center')}>
                                <BsSkipStartFill className={cx('back')} onClick={backSong} />
                                <span onClick={handleTogglePlayMusic}>
                                    {(isPlaying && !isPause)? (
                                        <BsPauseCircleFill className={cx('play')} />
                                    ) : (
                                        <BsPlayCircleFill className={cx('play')} />
                                    )}
                                </span>

                                <BsSkipEndFill className={cx('next')} onClick={nextSong} />
                            </div>
                            <BsShuffle className={cx('right')} onClick={clickShuffle}/>
                        </div>
                    </div>
                    <div className={cx('m-progressbar')}>
                        <span className={cx('time')}>
                            <span className="">{moment.utc((currentime / 10) * 1000).format('mm:ss')}</span>
                        </span>
                        <div className={cx('progressbarnocolor')}>
                            <ProgressBar />
                            <div className={cx('progressbarcolor')} ref={progressbarcolor}>
                                <ProgressBarColor />
                            </div>
                        </div>
                        <span className={cx('time')}>
                            <span>{song.Duration}</span>
                        </span>
                    </div>
                </div>
            ) : (
                <div className={cx('musicPlayer_fullView')}>
                    <img src={`data:image/jpeg;base64,${song.Picture}`} alt="" />
                    <div className={cx('musicPlayerContainer_fullView')}>
                        <div className={cx('center')}>
                            <BsSkipStartFill className={cx('back')} onClick={backSong} />
                            <span onClick={handleTogglePlayMusic}>
                                {(isPlaying && !isPause) ? (
                                    <BsPauseCircleFill className={cx('play')} />
                                ) : (
                                    <BsPlayCircleFill className={cx('play')} />
                                )}
                            </span>

                            <BsSkipEndFill className={cx('next')} onClick={nextSong} />
                        </div>
                        <div className={cx('detailSong')}>
                            <img src={`data:image/jpeg;base64,${song.Picture}`} alt="" />
                            <div className={cx('m-inf')}>
                                <p>{song.Title}</p>
                                <span>{song.Artist}</span>
                            </div>
                        </div>

                        <div className={cx('listIcon')}>
                            <AddPlayQueueIcon />
                            <MusicLiBraryIcon />
                            <AddPlayListIcon />
                        </div>

                        <div className={cx('m-progressbar')}>
                            <span className={cx('time')}>
                                <span className="">{moment.utc((currentime / 10) * 1000).format('mm:ss')}</span>
                            </span>
                            <div className={cx('progressbarnocolor')}>
                                <ProgressBar />
                                <div className={cx('progressbarcolor')} ref={progressbarcolor}>
                                    <ProgressBarColor />
                                </div>
                            </div>
                            <span className={cx('time')}>
                                <span>{song.Duration}</span>
                            </span>
                        </div>
                        <div className={cx('modeIcons')}>
                            <IoIosRepeat className={cx('left')} onClick={clickRepeat} />
                            <BsShuffle className={cx('right')} onClick={clickShuffle} />
                            <CiVolumeHigh className={cx('volumn')} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MusicPlayer;
