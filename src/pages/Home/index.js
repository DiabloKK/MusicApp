import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Slider from '~/components/Slider';

import AudioList from '~/components/AudioList';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('Home')}>
            <Header name="Home" />
            <Slider />
            <h2 className={cx('title')}>Recent music</h2>
            <div className={cx('content')}>
                <AudioList type="home" />
            </div>
        </div>
    );
}

export default Home;
