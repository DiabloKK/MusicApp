import classNames from 'classnames/bind';
import Button from '~/components/Button';
import PropTypes from 'prop-types';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item');
    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.albumName}
        </Button>
    );
}
MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
