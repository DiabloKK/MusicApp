import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';
import Wrapper from '~/components/Wrapper';
import MenuItem from './MenuItem';
import Button from '~/components/Button';
import CreatePlaylist from '~/components/CreatePlaylist';
import { UploadIcon } from '~/assets/icons';
import { useFileMP3Store } from '~/store/useFileMP3Store';
import styles from './Menu.module.scss';
import { useState } from 'react';
import { SongContext } from '~/hooks/SongContext';
import { useContext } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function MenuPlaylist({
    song,
    children,
    items = [],
    visible = false,
    hideOnClick = true,
    onChange = defaultFn,
    onClickOutside,
}) {
    const { addMusicPlayList } = useFileMP3Store();
    const [isOpenP, setIsOpenP] = useState(false);
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const context = useContext(SongContext);

    const renderItems = () => {
        return current.data.map((item, index) => {
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={(e) => {
                        addMusicPlayList(item.albumName, song.SourceFile);
                        let count = context.count + 1;
                        context.ChangeCount(count);
                        e.stopPropagation();
                    }}
                />
            );
        });
    };
    return (
        <>
            {isOpenP && <CreatePlaylist setIsOpen={setIsOpenP} />}
            <Tippy
                interactive
                visible={visible}
                offset={[12, 8]}
                delay={[0, 700]}
                // hideOnClick={hideOnClick}
                onClickOutside={onClickOutside}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                        <Wrapper className={cx('menu-popper')}>
                            <Button
                                leftIcon={<UploadIcon />}
                                className={cx('menu-item', {
                                    separate: true,
                                })}
                                onClick={(event) => {
                                    setIsOpenP(true);
                                    event.stopPropagation();
                                }}
                            >
                                New Playlist
                            </Button>
                            <div className={cx('menu-body')}> {renderItems()}</div>
                        </Wrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </>
    );
}
MenuPlaylist.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
    onClickOutside: PropTypes.func,
};

export default MenuPlaylist;
