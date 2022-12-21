import classNames from 'classnames/bind';
import { PlayListIcon, UploadFolderIcon } from '~/assets/icons';
import styles from './Add.module.scss';
import { BsChevronDown } from 'react-icons/bs';
import { useFileMP3Store } from '../../store/useFileMP3Store';
import Artist from '../Artist/index';

const cx = classNames.bind(styles);
function Add({ label = 'Add' }) {

    const {addMusic, stopMusic} = useFileMP3Store();

    const handle = async (e) => {
        await addMusic();
        await stopMusic();
    };
    return (
        <div className={cx('Add-container')}>
            <div className={cx('Add')}>
                <label htmlFor="file-upload" className={cx('')} onClick={handle}>
                    <PlayListIcon /> <p>{label + ' file(s)'}</p>
                </label>
                <div className={cx('more-container')}>
                    <BsChevronDown
                        className={cx('morebtn')}
                        onClick={() => {
                            document.querySelector('.' + cx('selections')).classList.toggle(cx('active'));
                        }}
                    />
                </div>
            </div>
            <div className={cx('selections')}>
                <div className={cx('selection-item')}>
                    <label htmlFor="file-upload2" className={cx('addLabel1')} onClick={handle}>
                        <PlayListIcon /> <p>{label + ' file(s)'}</p>
                    </label>
                </div>
                <div className={cx('selection-item')}>
                    <label htmlFor="folder-upload" className={cx('addLabel2')} onClick={handle}>
                        <UploadFolderIcon /> <p>{label + ' folder'}</p>
                    </label>
                </div>
            </div>
        </div>
    );
}
export default Add;
