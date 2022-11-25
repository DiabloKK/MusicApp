import classNames from 'classnames/bind';
import styles from './MusicPlayer.module.scss';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Songs } from '~/API/Songs';
import { BsPlayCircleFill, BsSkipEndFill, BsSkipStartFill, BsShuffle, BsPauseCircleFill } from 'react-icons/bs';
import { IoIosRepeat } from 'react-icons/io';
import { CiVolumeHigh } from 'react-icons/ci';

import { ProgressBar, ProgressBarColor } from '~/assets/Progressbar';
import { AddPlayListIcon, AddPlayQueueIcon, MusicLiBraryIcon } from '~/assets/icons';

const cx = classNames.bind(styles);
function MusicPlayer({ song = Songs[1], fullView = false }) {
    const [currentime, setCurrentime] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const progressbarcolor = useRef();
    const handleTogglePlayMusic = () => {
        setIsPlaying((isPlaying) => !isPlaying);
    };

    useEffect(() => {
        if (isPlaying && currentime < 1800) {
            const timeoutTime = setTimeout(() => {
                let percent = Math.round((currentime * 100) / 180) / 1000;

                console.log(percent);
                progressbarcolor.current.style.cssText = `width: ${percent * 351}px`;
                setCurrentime(currentime + 1);
            }, 100);

            return () => clearTimeout(timeoutTime);
        }
    });
    useEffect(() => {
        setCurrentime(0);
        setIsPlaying(false);
        progressbarcolor.current.style.cssText = `width: 0px`;
    }, [song]);

    return (
        <>
            {!fullView ? (
                <div className={cx('musicPlayer')}>
                    <div className={cx('m-container')}>
                        <div className={cx('m-image')}>
                            <img src={song.imgSrc} alt="" />
                        </div>
                        <div className={cx('m-inf')}>
                            <p>{song.songName}</p>
                            <span>{song.artist}</span>
                        </div>
                        <div className={cx('m-control')}>
                            <IoIosRepeat className={cx('left')} />
                            <div className={cx('center')}>
                                <BsSkipStartFill className={cx('back')} />
                                <span onClick={handleTogglePlayMusic}>
                                    {isPlaying ? (
                                        <BsPauseCircleFill className={cx('play')} />
                                    ) : (
                                        <BsPlayCircleFill className={cx('play')} />
                                    )}
                                </span>

                                <BsSkipEndFill className={cx('next')} />
                            </div>
                            <BsShuffle className={cx('right')} />
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
                            <span>{moment.utc(180 * 1000).format('mm:ss')}</span>
                        </span>
                    </div>
                </div>
            ) : (
                <div className={cx('musicPlayer_fullView')}>
                    <img src={song.imgSrc} alt="" />
                    <div className={cx('musicPlayerContainer_fullView')}>
                        <div className={cx('center')}>
                            <BsSkipStartFill className={cx('back')} />
                            <span onClick={handleTogglePlayMusic}>
                                {isPlaying ? (
                                    <BsPauseCircleFill className={cx('play')} />
                                ) : (
                                    <BsPlayCircleFill className={cx('play')} />
                                )}
                            </span>

                            <BsSkipEndFill className={cx('next')} />
                        </div>
                        <div className={cx('detailSong')}>
                            <img src={song.imgSrc} alt="" />
                            <div className={cx('m-inf')}>
                                <p>{song.songName}</p>
                                <span>{song.artist}</span>
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
                                <span>{moment.utc(180 * 1000).format('mm:ss')}</span>
                            </span>
                        </div>
                        <div className={cx('modeIcons')}>
                            <IoIosRepeat className={cx('left')} />
                            <BsShuffle className={cx('right')} />
                            <CiVolumeHigh className={cx('volumn')} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MusicPlayer;
