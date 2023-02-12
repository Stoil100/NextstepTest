import Wave from "../../assets/Waves/Wave";
import styles from "./Footer.module.css";
import Card from "../UI/Cards/Card";
import gmailIcon from "../../assets/gmail.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>     
    <Wave/>
      <Card className={styles.footerItemsHolder}>
        <Card className={styles.contactHolder}>
          <h2>Nextstep</h2>
          <h3>Учи бързо, печели бързо</h3>
          <a href="mailto:toli100ilov@gmail.com" className={styles.contacts}>
            <p>Свържете се с нас</p>
          </a>
        </Card>
        <Card className={styles.newsHolder}>
          <h2>News</h2>
          <p>Crypto</p>
          <p>Forex</p>
          <p>Stocks</p>
        </Card>
        <Card className={styles.coursesHolder}>
          <h2>Courses</h2>
          <p>Begginer</p>
          <p>Intermediate</p>
          <p>Advanced</p>
        </Card>
        <Card className={styles.madeByHolder}>
          <p>&copy; 2023/2024 NEXTSTEP - All Rights Reserved</p>
          <p>/</p>
          <p>Made by Stoil</p>
        </Card>
      </Card>
    </footer>
  );
};

export default Footer;
