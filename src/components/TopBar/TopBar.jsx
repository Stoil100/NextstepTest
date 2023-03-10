import React,{ useContext } from "react";
import logo from '../../assets/logo.png'

import styles from "./TopBar.module.css";
import { Link } from "react-router-dom";

const TopBar = () => {
    return (
    <nav>
      <ul className={styles.navBar}>
        <li>
          <Link to={"/"} className={styles.nextstepLogoLink}>
            <img src={logo} alt="Nextstep" className={styles.nextstepLogo}/>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopBar;
