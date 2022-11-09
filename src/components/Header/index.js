import classNames from 'classnames/bind';
import Add from '../Add';
import Search from '../Search';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);
function Header({ width }) {
    return (
        <aside className={cx('wrapper', { fullsite: width })}>
            <h3 className={cx('header-tiltle')}>Music library</h3>
            <div className={cx('Search-Add')}>
                <Search />
                <Add />
            </div>
        </aside>
    );
}
export default Header;
