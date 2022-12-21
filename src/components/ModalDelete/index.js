import classNames from 'classnames/bind';
import styles from './ModalDelete.module.scss';


const cx = classNames.bind(styles);

const ModalDelete = ({ setIsOpen }) => {
    return (
        <>
            <div className={cx('darkBG')} onClick={() => setIsOpen(false)} />
            <div className={cx('centered')}>
                <div className={cx('modal')}>
                    <div className={cx('modalHeader')}>
                        <h5 className={cx('heading')}>Dialog</h5>
                    </div>
                    {/* <button className={cx('loseBtn')} onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: '-3px' }} />
                    </button> */}
                    <div className={cx('modalContent')}>Are you sure you want to delete the item?</div>
                    <div className={cx('modalActions')}>
                        <div className={cx('actionsContainer')}>
                            <button className={cx('deleteBtn')} onClick={() => setIsOpen(false)}>
                                Delete
                            </button>
                            <button className={cx('cancelBtn')} onClick={() => setIsOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalDelete;
