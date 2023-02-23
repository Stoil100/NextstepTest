import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Cards/Card";
import styles from "./Main.module.css";
import Carousel from "../UI/Carousels/Carousel";
import coursesImg from "../../assets/courses.jpg";
import testsImg from "../../assets/tests.jpg";
import newsImg from "../../assets/news.jpg";
import chartImg from "../../assets/charts.jpg";

const carouselItems = [
  {
    title: "Курсове",
    content: "Обучавайте се чрез нашите специално за Вас направени курсове!",
    image: `${coursesImg}`,
  },
  {
    title: "Тестове",
    content:
      "Направете тестовете ни за да вдигате нивото си и да получавате точки.",
    image: `${testsImg}`,
  },
  {
    title: "Новини",
    content:
      "Следете какво се случва из света чрез нашите новини за криптовалути, стокови фондове и пазари.",
    image: `${newsImg}`,
  },
  {
    title: "Диаграми",
    content: "Разгледайте движението на криптовалутите с диаграмите ни",
    image: `${chartImg}`,
  },
];

function Box({ children, className }) {
  const boxRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(boxRef)
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3}
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
    <div
      ref={boxRef}
      className={`${styles.infoBox}
      ${className}
      ${isVisible ? styles.active : ""}`}
    >
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
          <h2>Научете се да търгувате чрез нашите подбрани инструменти</h2>
        </div>
        <Carousel items={carouselItems} />
      </section>
     {/* <section className={`${styles.section} ${styles.section3}`}>
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
          <Box className={styles.infoBox3}>
            <h3 className={styles.circlePoint}>3</h3>
            <Link to={"/signup"}>ЗАПОЧНЕТЕ!</Link>
          </Box>
        </Card>
      </section>*/}
    </Card>
  );
};

export default MainPage;
