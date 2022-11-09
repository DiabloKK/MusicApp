import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
function Menu() {
    useEffect(() => {
        const allLi = document.querySelector('.' + cx('menuList')).querySelectorAll('li');

        function changePopularActive() {
            allLi.forEach((n) => n.classList.remove(cx('active')));
            this.classList.add(cx('active'));
        }

        allLi.forEach((n) => n.addEventListener('click', changePopularActive));
    }, []);
    return (
        <div className={cx('menuList')}>
            <ul>
                <li>
                    <a href="#">Songs</a>
                </li>
                <li>
                    <a href="#">Ablums</a>
                </li>
                <li>
                    <a href="#">Artists</a>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
