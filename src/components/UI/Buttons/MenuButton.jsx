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

  const logoutHandler =()=>{
    ctx.onLogout();
    const sendApiData={username:`${ctx.enteredUsername}`,email:`${ctx.enteredEmail}`,password:`${ctx.enteredPassword}`}
  getApiResponse(sendApiData)
  }

  let getApiResponse = async (propsData) => {
    console.log(propsData);
    let response = await fetch("http://127.0.0.1:8000/accounts/logout/",{
      method:'POST',
      headers:{
      'Content-Type': 'application/json',
    },
      body:JSON.stringify(propsData),
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log("Success",data)
    })
    .catch((error)=>{
      console.error("Error:",error);
    })
    let data = await response.json();  
  };

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
      {ctx.isLoggedIn&&<button onClick={logoutHandler}>
        <img src={logoutIcon} alt="log out"/>
          <span>Log out</span>
        </button>}
      </div>
    </div>
  );
};

export default MenuButton;
