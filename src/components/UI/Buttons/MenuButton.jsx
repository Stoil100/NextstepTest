import { useState,useContext } from "react";
import styles from "./MenuButton.module.css";

import homeIcon from "../../../assets/home.svg";
import plusIcon from "../../../assets/plus.svg";
import profileIcon from "../../../assets/profile.svg";
import settingsIcon from "../../../assets/settings.svg";
import logoutIcon from "../../../assets/logout.svg";
import AuthContext from "../../store/auth-context";


export const MenuButton = () => {
  const ctx=useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.fab} ${isOpen ? styles.open : ""}`}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img src={plusIcon} alt="menu"/>
      </button>
      <div className={styles.menu}>
        <button>
        <img src={profileIcon} alt="profile"/>
          <span>Profile</span>
        </button>
        <button>
        <img src={homeIcon} alt="home"/>
          <span>Home</span>
        </button>
        <button>
          <img src={settingsIcon} alt="settings"/>
          <span>Settings</span>
        </button>
      {ctx.isLoggedIn&&<button onClick={ctx.onLogout}>
        <img src={logoutIcon} alt="log out"/>
          <span>Log out</span>
        </button>}
      </div>
    </div>
  );
};

export default MenuButton;
