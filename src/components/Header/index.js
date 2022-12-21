import classNames from 'classnames/bind';
import Add from '../Add';
import BtCreatePL from '../BtCreatePL';
import Search from '../Search';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);
function Header({ name = 'Music library' }) {
    return (
        <aside className={cx('wrapper')}>
            <h3 className={cx('header-tiltle')}>{name}</h3>
            <div className={cx('Search-Add')}>
                <Search />
                {name !== 'Playlist' ? <Add label={name === 'Home' ? 'Open' : 'Add'} /> : <BtCreatePL />}
            </div>
        </aside>
    );
}
export default Header;
