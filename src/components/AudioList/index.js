import classNames from 'classnames/bind';
import styles from './AudioList.module.scss';
import { Songs } from '~/API/Songs';
import Audio from '../Audio';
const cx = classNames.bind(styles);

function AudioList() {
    return (
        <div className={cx('AudioList')}>
            {Songs.map((song) => (
                <Audio key={song.id} song={song} />
            ))}
        </div>
    );
}

export default AudioList;
