import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './PlayQueue.module.scss';


import AudioList from '~/components/AudioList';

const cx = classNames.bind(styles);

function PlayQueue() {
    return (
        <div className={cx('PlayQueue')}>
            <Header name="Play queue" />
            <div className={cx('content')}>
                <AudioList />
            </div>
        </div>
    );
}

export default PlayQueue;
