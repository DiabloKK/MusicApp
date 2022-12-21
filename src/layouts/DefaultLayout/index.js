import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Sidebar from '../components/Sidebar';
import { useContext, useState } from 'react';
import MusicPlayer from '../components/MusicPlayer';
import { SongContext } from '~/hooks/SongContext';
import { useFileMP3Store } from '~/store/useFileMP3Store';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const [songsContainerOpen, setSongsContainerOpen] = useState(false);
    const [playAreaOpen, setPlayAreaOpen] = useState(false);
    const context = useContext(SongContext);

    const songPlayCurrent = context.song;

    const { changeVolume } = useFileMP3Store();
    const [isMute, setIsMute] = useState(false);

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
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('playArea', { fullsite: playAreaOpen })}>
                <button
                    className={cx('btn-arrow')}
                    onClick={() => {
                        setPlayAreaOpen(!playAreaOpen);
                    }}
                >
                    +
                </button>
                <MusicPlayer song={songPlayCurrent} fullView={playAreaOpen} />
                {/* <div className={cx('volume')}>
                    <img onClick={handleClickVolume} className={cx('icon-volume')} src={ isMute ? images.mute : images.unmute} alt=""/>
                    <input className={cx('value-volume')} type="range" id="volume" min="0" max="100" onChange={handleChangeVolume}/>
                </div> */}
            </div>
            <div className={cx('SongsContainer', { fullsite: songsContainerOpen }, { hidden: playAreaOpen })}>
                <button
                    className={cx('btn-arrow')}
                    onClick={() => {
                        setSongsContainerOpen(!songsContainerOpen);
                    }}
                >
                    +
                </button>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
