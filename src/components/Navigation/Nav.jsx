import React,{ useContext } from "react";
import AuthContext from "../store/auth-context";
import logo from '../../assets/logo.png'

import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

const Nav = (props) => {
    const ctx=useContext(AuthContext)
    return (
    <nav>
      <ul className={styles.navBar}>
        <li>
          <Link to={"/"} className={styles.nextstepLogoLink}>
            <img src={logo} alt="Nextstep" className={styles.nextstepLogo}/>
          </Link>
        </li>
        <li>
          {!ctx.isLoggedIn?<Link to={'/login'}>Log in</Link>:<Link to={"/courses"}>Courses</Link>} 
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
