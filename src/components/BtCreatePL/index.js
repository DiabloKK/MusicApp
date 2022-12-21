import classNames from 'classnames/bind';
import { UploadIcon } from '~/assets/icons';
import styles from './BtCreatePL.module.scss';
import { useState } from 'react';
import CreatePlaylist from '~/components/CreatePlaylist';

const cx = classNames.bind(styles);
function BtCreatePL() {
    const [isOpenP, setIsOpenP] = useState(false);

    return (
        <>
            {isOpenP && <CreatePlaylist setIsOpen={setIsOpenP} />}
            <div className={cx('Add-container')}>
                <div className={cx('Add')}>
                    <label
                        className={cx('')}
                        onClick={(event) => {
                            setIsOpenP(true);
                            event.stopPropagation();
                        }}
                    >
                        <UploadIcon /> <p>New PlayList</p>
                    </label>
                </div>
            </div>
        </>
    );
}
export default BtCreatePL;
