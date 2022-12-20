import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                <li className={cx('active')}s>
                    <Link to="/musicLibrary/" >
                        Songs
                    </Link>
                </li>
                <li>
                    <Link to="/musicLibrary/albums">Albums</Link>
                </li>
                <li>
                    <Link to="/musicLibrary/artists">Artists</Link>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
