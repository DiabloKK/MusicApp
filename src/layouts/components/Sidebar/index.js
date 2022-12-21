import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { icons } from '~/assets/icons';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import menu from './sibebar';
import 'tippy.js/themes/light.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);
function Sidebar() {
    useEffect(() => {
        const allLink = document.querySelectorAll(`.${cx('menu-items')} .${cx('item')}`);
        allLink[0].classList.add(cx('active'));
        const action = document.querySelector(`.${cx('action')}`);
        function changeMenuActive() {
            allLink.forEach((n) => n.classList.remove(cx('active')));
            this.classList.add(cx('active'));
            action.style.transform = `translate(10px,${this.offsetTop}px)`;
        }

        allLink.forEach((n) => n.addEventListener('click', changeMenuActive));
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <img className={cx('logo')} src={images.logo} alt="logo" />

            <div className={cx('menu-items')}>
                {menu.map((item) => (
                    <Tippy key={item.id} delay={[0, 200]} content={item.title} placement="right" theme="light">
                        <Link key={item.id} to={item.link} className={cx('item')}>
                            {item.icon}
                        </Link>
                    </Tippy>
                ))}
                {/* <Link to="/" className={cx('item')}>
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
                </Link> */}
            </div>
            <div className={cx('action')}></div>
        </aside>
    );
}

export default Sidebar;
