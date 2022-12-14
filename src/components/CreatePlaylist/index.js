import classNames from 'classnames/bind';
import styles from './CreatePlaylist.module.scss';
import { useRef, useState } from 'react';
import { useFileMP3Store } from '~/store/useFileMP3Store';

import { useContext } from 'react';
import { SongContext } from '~/hooks/SongContext';

const cx = classNames.bind(styles);

const CreatePlaylist = ({ setIsOpen }) => {
    const refInput = useRef();
    const [searchValue, setSearchValue] = useState('');
    const context = useContext(SongContext);
   
    const {
        createPlayList
    } = useFileMP3Store();
    const handleChange = (e) => {
        if (!e.target.value.startsWith(' ')) setSearchValue(e.target.value);
    };
    return (
        <>
            <div className={cx('darkBG')} onClick={() => setIsOpen(false)} />
            <div className={cx('centered')}>
                <div className={cx('modal')}>
                    <div className={cx('modalHeader')}>
                        <h5 className={cx('heading')}>Create new Playlist</h5>
                    </div>

                    <div className={cx('modalContent')}>
                        <input
                            ref={refInput}
                            value={searchValue}
                            placeholder="Enter a Playlist"
                            spellCheck="false"
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className={cx('modalActions')}>
                        <div className={cx('actionsContainer')}>
                            <button className={cx('OKBtn')} onClick={() => {
                                createPlayList(searchValue);
                                var count = context.count+1
                                context.ChangeCount(count)
                                setIsOpen(false)
                            }}>
                                OK
                            </button>
                            <button className={cx('cancelBtn')} onClick={() => setIsOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePlaylist;
