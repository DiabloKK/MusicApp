import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Slider from '~/components/Slider';
import Menu from '~/components/Menu';
import AudioList from '~/components/AudioList';

const cx = classNames.bind(styles);
function MusicLibrary() {
    return (
        <div className={cx('Home')}>
            <Header />
            <Slider />
            <Menu />
            <AudioList />
        </div>
    );
}

export default MusicLibrary;
