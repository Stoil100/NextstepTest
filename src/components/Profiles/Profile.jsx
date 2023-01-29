import React from "react";

import styles from "./Profile.module.css";
import Card from "../UI/Cards/Card";
import personIcon from '../../assets/person.svg';
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const Profile = (props) => {
  const ctx=useContext(AuthContext);
  return (
    <Card className={styles.profileBox}>
      <Card className={`${styles.box1} `}>
        <div className={styles.imageAndUsernameHolder}>
          <img src={personIcon} className={styles.profileImg} alt="profileImg"></img>
          <h2>{ctx.usernameValue}</h2>
        </div>
        <hr></hr>
        <div className={styles.infoHolder}>
            <h3>Емайл:</h3>
            <h4>{ctx.emailValue}</h4>
        </div>
        <div className={styles.infoHolder}>
            <h3>Парола:</h3>
            <h4>{ctx.passwordValue}</h4>
        </div>
      </Card>
      <Card className={`${styles.levelBox} `}>
        <h2>Ниво:</h2>
        <h1>Начинаещ</h1>
      </Card>
      <Card className={`${styles.box2} `}>
        <h2>Изгледани курсове:</h2>
        <ol>
          <li>Курс за начинаещи</li>
        </ol>
      </Card>
    </Card>
  );
};

export default Profile;
