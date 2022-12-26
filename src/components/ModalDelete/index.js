import classNames from 'classnames/bind';
import styles from './ModalDelete.module.scss';
import { useFileMP3Store } from '~/store/useFileMP3Store';
import { SongContext } from '~/hooks/SongContext';
import { useContext } from 'react';

import { useState, useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

const ModalDelete = ({ setIsOpen, song }) => {
    const { deleteMusic, stopMusic, loadListMusic, loadRecentMusic, loadLoveMusic } = useFileMP3Store();
    const [songs, setSongs] = useState([]);
    const context = useContext(SongContext);
    useEffect(() => {
        const type = '';
        const load = async () => {
            var list;
            switch (type) {
                case 'home':
                    list = await loadRecentMusic();
                    // list.reverse();

                    break;
                case 'love':
                    list = await loadLoveMusic();
                    break;
                default:
                    list = await loadListMusic();
            }

            setSongs(list);
        };

        load();
    }, []);

    return (
        <>
            <div className={cx('darkBG')} onClick={() => setIsOpen(false)} />
            <div className={cx('centered')}>
                <div className={cx('modal')}>
                    <div className={cx('modalHeader')}>
                        <h5 className={cx('heading')}>Dialog</h5>
                    </div>
                    {/* <button className={cx('loseBtn')} onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: '-3px' }} />
                    </button> */}
                    <div className={cx('modalContent')}>Are you sure you want to delete the item?</div>
                    <div className={cx('modalActions')}>
                        <div className={cx('actionsContainer')}>
                            <button
                                className={cx('deleteBtn')}
                                onClick={(e) => {
                                    console.log(song.id);

                                    deleteMusic(song.SourceFile);
                                    console.log(context.song);
                                    let count = context.count + 1;
                                    context.ChangeCount(count);
                                    context.ChangeSong(songs[song.id]);
                                  
                                    setIsOpen(false);
                                    e.stopPropagation();
                                }}
                            >
                                Delete
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

export default ModalDelete;
