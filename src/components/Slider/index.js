import React, { useState, useEffect } from 'react';
import styles from './Slider.module.scss';
import classNames from 'classnames/bind';
import { useFileMP3Store } from '~/store/useFileMP3Store';

const cx = classNames.bind(styles);

const Slider = () => {

    const {loadListMusic} = useFileMP3Store();
    const [listSong, setListSong] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const load = async () => {
            const list = await loadListMusic();
            setListSong(list);
        }
    
        load();
      }, []);

    useEffect(() => {
        const lastIndex = listSong.length - 1;
        if (index < 0) {
            setIndex(lastIndex);
        }
        if (index > lastIndex) {
            setIndex(0);
        }
    }, [index, listSong]);

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1);
        }, 5000);
        return () => {
            clearInterval(slider);
        };
    }, [index]);

    return (
        <section className={cx('section')}>
            <div className={cx('section-center')}>
                {listSong.map((item, indexPeople) => {
                    const { id, Picture, Title, Artist } = item;
                    let position = 'nextSlide';
                    if (indexPeople === index) {
                        position = 'activeSlide';
                    }
                    if (indexPeople === index - 1 || (index === 0 && indexPeople === listSong.length - 1)) {
                        position = 'lastSlide';
                    }
                    return (
                        <article className={cx(position)} key={id}>
                            <img src={`data:image/jpeg;base64,${Picture}`} alt={Artist} className={cx('person-img')} />
                        </article>
                    );
                })}
                <button className={cx('prev')} onClick={() => setIndex(index - 1)}>
                    <i className="fas fa-arrow-left" />
                </button>
                <button className={cx('next')} onClick={() => setIndex(index + 1)}>
                    <i className="fas fa-arrow-right" />
                </button>
            </div>
        </section>
    );
};

export default Slider;
