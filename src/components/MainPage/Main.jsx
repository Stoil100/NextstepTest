import {useEffect, useRef, useState} from 'react';
import Button from "../UI/Buttons/LoginButton";
import Card from "../UI/Cards/Card";
import tradingImg from "../../assets/trading.jpg";
import styles from "./Main.module.css";
import Wave from '../../assets/Waves/Wave';

const MainPage = () => {
  const infoBox = useRef(null);
  const[showClasses,setShowClasses]=useState(false);

  function debounce(func, wait = 10, immediate = true) {
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
          <h1>What is the Nextstep in trading?</h1>
          <h3>We will help you make it!</h3>
        </Card>
        <Card className={styles.section1Holder2}>
          <a className={styles.headerButton}>
            <span className={styles.headerButtonText}>Sign up</span>
          </a>
          <h3>To begin your journy!</h3>
        </Card>
      </section>
      <section className={`${styles.section} ${styles.section2}`}>
        <div>
          <h2>Upgrade your knowladge from your own starting point!</h2>
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
              Take our quiz to define your knowladge level in trading with
              crypto, stocks and forex
            </p>
          </div>
          <div
            className={`${styles.infoBox} ${
              styles.infoBox2
            } ${infoBoxclasses}  ${showClasses ? styles.active : ""}`}
            ref={infoBox}
          >
            <h3 className={styles.circlePoint}>2</h3>
            <p>Your knowladge level will help us find what's best for you!</p>
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
            <a>GET STARTED!</a>
          </div>
        </Card>
      </section>
      <section className={`${styles.section} ${styles.section3}`}></section>
    </Card>
  );
};

export default MainPage;
