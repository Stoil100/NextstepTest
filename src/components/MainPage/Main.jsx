import {useEffect, useRef, useState} from 'react';
import { Link } from "react-router-dom";
import Button from "../UI/Buttons/LoginButton";
import Card from "../UI/Cards/Card";
import tradingImg from "../../assets/trading.jpg";
import styles from "./Main.module.css";
import Wave from '../../assets/Waves/Wave';

const MainPage = () => {
  const infoBox = useRef(null);
  const[showClasses,setShowClasses]=useState(false);

  function debounce(func, wait = 1, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  let infoBoxclasses=[];
  function checkSlide() {

    const itemHeight=infoBox.current.parentElement.offsetHeight;
    const itemOffsetTop=infoBox.current.parentElement.offsetTop;
      const slideInAt = window.scrollY  + itemHeight/2;
      console.log(slideInAt);
      const isHalfShown = slideInAt > itemOffsetTop;
      if (isHalfShown) {
        setShowClasses(true);
      } else {
        setShowClasses(false);
      }
    }

  window.addEventListener('scroll', debounce(checkSlide));
  return (
    <Card className={styles.mainBox}>
      <section className={`${styles.section} ${styles.section1}`}>
        <Card className={styles.section1Holder1}>
          <h1 className={styles.section1Title}>Каква е следващата стъпка в търговията?</h1>
          <h3>Ние ще ви помогнем да я направите!</h3>
        </Card>
        <Card className={styles.section1Holder2}>
          <Link to={'/signup'} className={styles.headerButton}>
            <span className={styles.headerButtonText}>Регистрирайте се</span>
          </Link>
          <h3>За да започнете обучението си!</h3>
        </Card>
      </section>
      <section className={`${styles.section} ${styles.section2}`}>
        <div>
          <h2 className={styles.section2Title}>Усъвършенствайте знанията си от собствената си отправна точка!</h2>
        </div>
        <Card className={styles.infoHolder}>
          <div
            className={`${styles.infoBox} ${
              styles.infoBox1
            } ${infoBoxclasses} ${showClasses ? styles.active : ""}`}
            ref={infoBox}
          >
            <h3 className={styles.circlePoint}>1</h3>
            <p>
            Вземете нашия тест, за да определите нивото си на знания в търговията с
              криптовалути, акции и форекс
            </p>
          </div>
          <div
            className={`${styles.infoBox} ${
              styles.infoBox2
            } ${infoBoxclasses}  ${showClasses ? styles.active : ""}`}
            ref={infoBox}
          >
            <h3 className={styles.circlePoint}>2</h3>
            <p>Вашето ниво на познания ще ни помогне да намерим най-доброто за вас!</p>
          </div>
          <div
            className={`
            ${styles.infoBox} 
            ${styles.infoBox3}
            ${infoBoxclasses}  
            ${showClasses ? styles.active : ""} 
            `}
            ref={infoBox}
          >
            <h3 className={styles.circlePoint}>3</h3>
            <Link to={'/signup'}>ЗАПОЧНЕТЕ!</Link>
          </div>
        </Card>
      </section>
      <section className={`${styles.section} ${styles.section3}`}>
       
      </section>
    </Card>
  );
};

export default MainPage;
