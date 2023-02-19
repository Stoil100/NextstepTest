import Wave from "../../assets/Waves/Wave";
import styles from "./Footer.module.css";
import Card from "../UI/Cards/Card";
import gmailIcon from "../../assets/gmail.svg";
import facebookIcon from "../../assets/facebook.svg";
import githubIcon from "../../assets/github.svg";
import instagramIcon from "../../assets/instagram.svg"
import nextstepLogo from '../../assets/logo.png'

const Footer = () => {
  return (
    <footer className={styles.footer}>     
    <Wave/>
      <Card className={styles.footerItemsHolder}>
        <div className={styles.footerCompanyLogoBox}>
          <img src={nextstepLogo} alt="company logo" />
          <h2>Учи бързо, печели бързо</h2>
        </div>
        <div className={styles.footerContactsBox}>
          <h1>Свържете се с нас</h1>
          <div className={styles.footerContactsIconsBox}>
          <a href="mailto:toli100ilov@gmail.com" className={`${styles.footerContactsLink}`}>
            <img src={gmailIcon} alt="company logo"></img>
            <span>Gmail</span>
          </a>
          <a href="https://www.facebook.com/Stoil_Stoilov/" target="_blank" className={`${styles.footerContactsLink}`}>
            <img src={facebookIcon} alt="facebook"></img>
            <span>Facebook</span>
          </a>
          <a href="https://github.com/Stoil100/" target="_blank" className={`${styles.footerContactsLink}`}>
            <img src={githubIcon} alt="github"></img>
            <span>Github</span>
          </a>
          <a href="https://www.instagram.com/Stoil__001/" target="_blank" className={`${styles.footerContactsLink}`}>
            <img src={instagramIcon} alt="instagram"></img>
            <span>Instagram</span>
          </a>
          </div>
        </div>
        <Card className={styles.madeByHolder}>
          <p>&copy; 2023/2024 NEXTSTEP - All Rights Reserved /</p>
          <p>Made by Stoil and Samuil</p>
        </Card>
      </Card>
    </footer>
  );
};

export default Footer;
