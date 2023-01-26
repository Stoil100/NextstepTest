import Button from "../UI/Buttons/LoginButton";
import Card from "../UI/Cards/Card";
import tradingImg from '../../assets/trading.jpg'
import styles from "./Main.module.css";


const MainPage = () => {
  let rightTriangleBorder=1;
  let leftTriangleBorder=1;
  let previousScrollY=0
  window.onscroll=()=>{
    const leftTriangle=document.getElementById('leftTriangle');
    const rightTriangle=document.getElementById('rightTriangle');
    if(window.scrollY>previousScrollY){
      leftTriangleBorder+=leftTriangleBorder*0.05;
      rightTriangleBorder+=rightTriangleBorder*0.05;
    }
    else if(window.scrollY<previousScrollY){
      leftTriangleBorder-=leftTriangleBorder*0.05;
      rightTriangleBorder-=rightTriangleBorder*0.05;
    }
    leftTriangle.style.borderLeftWidth=`${leftTriangleBorder}px`;
    rightTriangle.style.borderRightWidth=`${rightTriangleBorder}px`;
    previousScrollY=window.scrollY;
  }

  return (
    <Card className={styles.mainBox} >
      <section className={`${styles.section} ${styles.section1}`}>
        <Card className={styles.section1Holder1}>
          <h1>What is the Nextstep in trading?</h1>
          <h3>We will help you make it!</h3>
        </Card>
        <Card className={styles.section1Holder2}>
          <a className={styles.headerButton}><span className={styles.headerButtonText}>Sign up</span></a>
          <h3>To begin your journy!</h3>
        </Card>
      </section>
      <section className={`${styles.section} ${styles.section2}`}>
        <Card className={styles.triangleHolder}>
          <div className={styles.arrowRight} id="leftTriangle"></div>
          <div className={styles.arrowLeft} id="rightTriangle"></div>
          <div></div>
          <div></div>
          <div></div>
        </Card>
      </section>
      <section className={`${styles.section} ${styles.section3}`}></section>
    </Card>
  );
};

export default MainPage;
