import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import icons from '~/assets/icons';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

const cx = classNames.bind(styles);
function Sidebar() {
    useEffect(() => {
        const allLink = document.querySelectorAll('.Sidebar_menu-items__NZNK9 .Sidebar_item__0ZzQ6');
        const action = document.querySelector('.Sidebar_action__LKz67');
        function changeMenuActive() {
            allLink.forEach((n) => n.classList.remove('active'));
            this.classList.add('active');
            action.style.transform = `translate(10px,${this.offsetTop}px)`;
        }

        allLink.forEach((n) => n.addEventListener('click', changeMenuActive));
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <img className={cx('logo')} src={images.logo} alt="logo" />
            <div className={cx('menu-items')}>
                <Link to="/" className={cx('item')}>
                    <img src={icons.home} alt="Home" />
                </Link>
                <Link to="/musicLiBrary" className={cx('item')}>
                    <img src={icons.musicLiBrary} alt="musicLiBrary" />
                </Link>
                <Link to="/playQueue" className={cx('item')}>
                    <img src={icons.playQueue} alt="playQueue" />
                </Link>
                <Link to="/playList" className={cx('item')}>
                    <img src={icons.playList} alt="playList" />
                </Link>
            </div>
            <div className={cx('action')}></div>
        </aside>
    );
}

export default Sidebar;
