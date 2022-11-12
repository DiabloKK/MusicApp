import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { SearchIcon } from '~/assets/icons';

const cx = classNames.bind(styles);

function Search() {
    const refInput = useRef();
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e) => {
        if (!e.target.value.startsWith(' ')) setSearchValue(e.target.value);
    };
    return (
        <div className={cx('search')}>
            <SearchIcon className={cx('search-icon')} />

            <input
                ref={refInput}
                value={searchValue}
                placeholder="Search"
                spellCheck="false"
                onChange={handleChange}
            ></input>
        </div>
    );
}

export default Search;
