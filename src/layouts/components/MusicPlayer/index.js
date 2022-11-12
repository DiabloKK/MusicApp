import classNames from 'classnames/bind';
import styles from './MusicPlayer.module.scss';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Songs } from '~/API/Songs';
import { BsPlayCircleFill, BsSkipEndFill, BsSkipStartFill, BsShuffle, BsPauseCircleFill } from 'react-icons/bs';
import { IoIosRepeat } from 'react-icons/io';
import { ProgressBar, ProgressBarColor } from '~/assets/Progressbar';
const cx = classNames.bind(styles);
function MusicPlayer({ song = Songs[1] }) {
    const [currentime, setCurrentime] = useState(0);

    const [isPlaying, setISPlaying] = useState(false);
    const progressbarcolor = useRef();
    const handleTogglePlayMusic = () => {
        setISPlaying((isPlaying) => !isPlaying);
    };

    useEffect(() => {
        if (isPlaying && currentime < 180) {
            const timeoutTime = setTimeout(() => {
                setCurrentime(currentime + 1);

                let percent = Math.round((currentime * 1000) / 180) / 1000;

                console.log(percent);
                progressbarcolor.current.style.cssText = `width: ${percent * 351}px`;
            }, 1000);

            return () => clearTimeout(timeoutTime);
        }
    });

    return (
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
                    <span className="">{moment.utc(currentime * 1000).format('mm:ss')}</span>
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
    );
}

export default MusicPlayer;
