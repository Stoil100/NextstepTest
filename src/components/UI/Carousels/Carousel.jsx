import React, { useState, useRef, useEffect } from 'react';
import styles from './Carousel.module.css';

const Carousel=({ items }) =>{
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const intervalRef = useRef();

  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 3000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlay, items.length]);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel_wrapper} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} className={styles.carousel_item} style={{ backgroundImage: `url(${  item.image })`}}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
      <div className={styles.carousel_nav}>
        {items.map((_, index) => (
          <button
            key={index}
            className={currentIndex === index ? styles.active : ''}
            onClick={() => handleIndicatorClick(index)}
          >
            
          </button>
        ))}
      </div>
    </div>
  );
}
export default Carousel;