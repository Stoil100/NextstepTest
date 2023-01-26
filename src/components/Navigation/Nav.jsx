import React,{ useContext } from "react";
import AuthContext from "../store/auth-context";

import styles from "./Nav.module.css";

const Nav = (props) => {
    const ctx=useContext(AuthContext)
    return (
    <nav>
      <ul className={styles.navBar}>
        <li className={styles.navItems}>
          <input value="I"></input>
        </li>
        <li>
          <h2>NEXTSTEP</h2>
        </li>
        <li>
          {!ctx.isLoggedIn?<a>Sign up</a>:<a>Courses</a>} 
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
