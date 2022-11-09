import classNames from 'classnames/bind';
import styles from './Add.module.scss';

const cx = classNames.bind(styles);
function Add() {
    return (
        <div className={cx('Add')}>
            <p>Add file(s)</p>
        </div>
    );
}
export default Add;
