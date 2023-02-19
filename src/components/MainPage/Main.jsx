import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Cards/Card";
import styles from "./Main.module.css";
  
  function Box({ children, className }) {
    const boxRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.3 }
      );
  
      observer.observe(boxRef.current);
  
      return () => {
        observer.disconnect();
      };
    }, [boxRef]);
  
  /*  useEffect(() => {
      const handleTransitionEnd = () => {
        if (isVisible) {
          boxRef.current.classList.add(styles['animate-box']);
        }
      };
  
      if (boxRef.current) {
        boxRef.current.addEventListener('transitionend', handleTransitionEnd);
      }
  
      return () => {
        if (boxRef.current) {
          boxRef.current.removeEventListener('transitionend', handleTransitionEnd);
        }
      };
    }, [isVisible]);*/

    return (
      <div ref={boxRef} className={`${styles.infoBox}
      ${className}
      ${isVisible ? styles.active : ""}`}>
        {children}
      </div>
    );
  }

const MainPage = () => {
  return (
    <Card className={styles.mainBox}>
      <section className={`${styles.section} ${styles.section1}`}>
        <Card className={styles.section1Holder1}>
          <h1 className={styles.section1Title}>
            Каква е следващата стъпка в търговията?
          </h1>
          <h3>Ние ще ви помогнем да я направите!</h3>
        </Card>
        <Card className={styles.section1Holder2}>
          <Link to={"/signup"} className={styles.headerButton}>
            <span className={styles.headerButtonText}>Регистрирайте се</span>
          </Link>
          <h3>За да започнете обучението си!</h3>
        </Card>
      </section>
      <section className={`${styles.section} ${styles.section2}`}>
        <div>
          <h2 className={styles.section2Title}>
            Усъвършенствайте знанията си от собствената си отправна точка!
          </h2>
        </div>
        <Card className={styles.infoHolder}>
            <Box className={styles.infoBox1}>
              <h3 className={styles.circlePoint}>1</h3>
              <p>
                Вземете нашия тест, за да определите нивото си на знания в
                търговията с криптовалути, акции и форекс
              </p>
            </Box>
            <Box className={styles.infoBox2}>
              <h3 className={styles.circlePoint}>2</h3>
              <p>
                Вашето ниво на познания ще ни помогне да намерим най-доброто за
                вас!
              </p>
            </Box>
            <Box className={styles.infoBox3 }>
              <h3 className={styles.circlePoint}>3</h3>
              <Link to={"/signup"}>ЗАПОЧНЕТЕ!</Link>
            </Box>
        </Card>
      </section>
      <section className={`${styles.section} ${styles.section3}`}></section>
    </Card>
  );
};

export default MainPage;
