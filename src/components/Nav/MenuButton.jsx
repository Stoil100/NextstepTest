import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MenuButton.module.css";

import homeIcon from "../../assets/home.svg";
import plusIcon from "../../assets/plus.svg";
import profileIcon from "../../assets/profile.svg";
import newsIcon from "../../assets/news.svg";
import logoutIcon from "../../assets/logout.svg";
import searchIcon from "../../assets/search.svg";
//import chatIcon from "../../assets/chat.svg";

import AuthContext from "../store/auth-context";

const MenuButton = () => {
  const ctx = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    ctx.onLogout();
    const sendApiData = {
      username: `${ctx.enteredUsername}`,
      email: `${ctx.enteredEmail}`,
      password: `${ctx.enteredPassword}`,
    };
    await getApiResponse(sendApiData);
    setIsOpen(!isOpen);
    navigate("/login");
  };

  const navigationHandler = (path) => {
    navigate(`/${path}`);
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.fab} ${isOpen ? styles.open : ""}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img src={plusIcon} alt="menu" />
      </button>
      <div className={styles.menu}>
        {/* <button onClick={() => navigationHandler("chat")}>
          <img src={chatIcon} alt="chat" />
          <span>Chat</span>
        </button> */}
        <button onClick={() => navigationHandler("cryptoList")}>
          <img src={searchIcon} alt="charts" />
          <span>Диаграми</span>
        </button>
        <button onClick={() => navigationHandler("profile")}>
          <img src={profileIcon} alt="profile" />
          <span>Профил</span>
        </button>
        <button onClick={() => navigationHandler("courses")}>
          <img src={homeIcon} alt="home" />
          <span>Курсове</span>
        </button>
        <button onClick={() => navigationHandler("news")}>
          <img src={newsIcon} alt="news" />
          <span>Новини</span>
        </button>
        <button onClick={logoutHandler}>
          <img src={logoutIcon} alt="log out" />
          <span>Изход</span>
        </button>
      </div>
    </div>
  );
};

export default MenuButton;

async function getApiResponse(props) {
  console.log(props);
  try {
    const response = await fetch(
      "https://nextstep-trading-backend.herokuapp.com/accounts/logout/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      }
    );
    const data = await response.json();
    localStorage.removeItem("access key");
    localStorage.removeItem("refresh key");
    console.log("Success", data);
  } catch (error) {
    console.error("Error:", error);
  }
}
