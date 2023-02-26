import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MenuButton.module.css";

import homeIcon from "../../assets/home.svg";
import plusIcon from "../../assets/plus.svg";
import profileIcon from "../../assets/profile.svg";
import newsIcon from "../../assets/news.svg";
import logoutIcon from "../../assets/logout.svg";
import searchIcon from "../../assets/search.svg"
import AuthContext from "../store/auth-context";

export const MenuButton = () => {
  const ctx = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    ctx.onLogout();
    const sendApiData = {
      username: `${ctx.enteredUsername}`,
      email: `${ctx.enteredEmail}`,
      password: `${ctx.enteredPassword}`,
    };
    getApiResponse(sendApiData);
    navigate("/login");
  };
  const profileHandler = () => {
    navigate("/profile");
  };
  const newsHandler = () => {
    navigate("/news");
  };
  const articlesHandler = () => {
    navigate("/courses");
  };
  const searchHandler = () => {
    navigate("/cryptoList");
  };

  let getApiResponse = async (props) => {
    console.log(props);
    let response = await fetch("https://nextstep-trading-backend.herokuapp.com/accounts/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.removeItem("access key");
        localStorage.removeItem("refresh key");
        console.log("Success", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={`${styles.fab} ${isOpen ? styles.open : ""}`}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img src={plusIcon} alt="menu" />
      </button>
      <div className={styles.menu}>
        <button onClick={searchHandler}>
          <img src={searchIcon} alt="charts" />
          <span>Диаграми</span>
        </button>
        <button onClick={profileHandler}>
          <img src={profileIcon} alt="profile" />
          <span>Профил</span>
        </button>
        <button onClick={articlesHandler}>
          <img src={homeIcon} alt="home" />
          <span>Курсове</span>
        </button>
        <button onClick={newsHandler}>
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
