import React from "react";

import styles from "./ErrorModal.module.css";

import Card from "../Cards/Card";
import Button from "../Buttons/LoginButton";

const ErrorModal = (props) => {
  return (
    <div>
      <div  className={styles.backdrop} onClick={props.onConfirm}/>
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <p>{props.message}</p>
        </div>
        <footer className={styles.actions}>
          <button className={styles.closeButton} onClick={props.onConfirm}>Okay</button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
