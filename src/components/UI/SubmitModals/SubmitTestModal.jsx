import React from "react";

import styles from "./SubmitTestModal.module.css";

import Card from "../Cards/Card";
import Button from "../Buttons/LoginButton";
import { Link } from "react-router-dom";

const SubmitTestModal = (props) => {
  console.log(props)
  return (
    <div>
      <div  className={styles.backdrop} onClick={props.onClick}/>
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>You got</h2>
        </header>
        <div className={styles.content}>
          <p>{props.userPoints} points</p>
        </div>
        <footer className={styles.actions}>
          <button to={"/profile"} className={styles.closeButton} onClick={props.onClick}>Okay</button>
        </footer>
      </Card>
    </div>
  );
};

export default SubmitTestModal;
