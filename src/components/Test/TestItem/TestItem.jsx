import React from "react";
import styles from "./TestItem.module.css";
import Card from "../../UI/Cards/Card";

const TestItem = (props) => {
  console.log(props);
  console.log("I was rendered")

  const checkFormData = (e) => {
    var labels=document.querySelectorAll('label');
    labels.forEach((label) => {
      if (label.getAttribute("for") === e.target.value) {
       props.onClick(label.textContent,props.id)
      }
    });
  };

  return (
    <Card className={styles.testItemHolder}>
      <h2 className={styles.testTitle}>{props.question}</h2>
      <form className={styles.formHolder} onChange={checkFormData}>
        <input
          id={`choice1${props.id}`}
          type="radio"
          name="hopping"
          className={styles.inputs}
          value={`choice1${props.id}`}
        />
        <label className={styles.labels} htmlFor={`choice1${props.id}`}>
          <span />
          {props.option1}
        </label>
        <input
          id={`choice2${props.id}`}
          type="radio"
          name="hopping"
          className={styles.inputs}
          value={`choice2${props.id}`}
        />
        <label className={styles.labels} htmlFor={`choice2${props.id}`}>
          <span />
          {props.option2}
        </label>
        <input
          id={`choice3${props.id}`}
          type="radio"
          name="hopping"
          className={styles.inputs}
          value={`choice3${props.id}`}
        />
        <label className={styles.labels} htmlFor={`choice3${props.id}`}>
          <span />
          {props.option3}
        </label>
        <input
          id={`choice4${props.id}`}
          type="radio"
          name="hopping"
          className={styles.inputs}
          value={`choice4${props.id}`}
        />
        <label className={styles.labels} htmlFor={`choice4${props.id}`}>
          <span />
          {props.option4}
        </label>
        <div className={styles.worm}>
          <div className={styles.worm__segment}></div>
          <div className={styles.worm__segment}></div>
          <div className={styles.worm__segment}></div>
          <div className={styles.worm__segment}></div>
        </div>
      </form>
    </Card>
  );
};

export default TestItem;
