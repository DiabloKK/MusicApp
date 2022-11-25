import classNames from 'classnames/bind';
import { PlayListIcon, UploadFolderIcon } from '~/assets/icons';
import styles from './Add.module.scss';
import { BsChevronDown } from 'react-icons/bs';

const cx = classNames.bind(styles);
function Add({ label = 'Add' }) {
    const handle = (e) => {
        var files = e.target.files;
        for (var i = 0; i < files.length; i++) {
            console.log(URL.createObjectURL(files[i]));
            console.log(files[i]);
        }
    };
    return (
        <div className={cx('Add-container')}>
            <div className={cx('Add')}>
                <label htmlFor="file-upload" className={cx('')}>
                    <PlayListIcon /> <p>{label + ' file(s)'}</p>
                </label>
                <input type="file" id="file-upload" multiple onChange={handle} />
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
                    <label htmlFor="file-upload2" className={cx('addLabel1')}>
                        <PlayListIcon /> <p>{label + ' file(s)'}</p>
                    </label>
                    <input type="file" id="file-upload2" multiple onChange={handle} />
                </div>
                <div className={cx('selection-item')}>
                    <label htmlFor="folder-upload" className={cx('addLabel2')}>
                        <UploadFolderIcon /> <p>{label + ' folder'}</p>
                    </label>
                    <input type="file" id="folder-upload" webkitdirectory="true" onChange={handle} />
                </div>
            </div>
        </div>
    );
}
export default Add;
