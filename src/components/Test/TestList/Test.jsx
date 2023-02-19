import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Card from "../../UI/Cards/Card";
import styles from "./Test.module.css";

import TestItem from "../TestItem/TestItem";
import arrowNext from "../../../assets/arrowNext.svg";
import arrowPrevious from "../../../assets/arrowPrevious.svg";
import Loader from "../../UI/Loader/Loader";

const Test = (props) => {
  const params = useParams();
  console.log(params.testId);
  let userPoints = 0;
  let counter = 1;
  let [list, setList] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/knowledge_quiz/quiz/")
      .then((response) => response.json())
      .then((data) => {
        data.map((item) => {
          if (item.article_id === parseInt(params.testId)) setList(item.quiz_questions);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [params.testId]);

  const checkValue = (value, id) => {
    console.log(list.at(id - 1).rightAnswer);
    if (list.at(id - 1).rightAnswer === value) {
      list.at(id - 1).choice = true;
    } else {
      list.at(id - 1).choice = false;
    }
    console.log(list.at(id - 1).choice);
  };
  const prevBtnClicked = () => {
    if (counter !== 0) {
      counter--;
    }
    window.scrollTo(0, window.innerHeight * counter);
  };
  const nextBtnClicked = () => {
    if (counter !== 10) {
      counter++;
    }

    window.scrollTo(0, window.innerHeight * counter);
  };
  const submitTest = () => {
    list.forEach((item) => {
      console.log(item);
      if (item.choice === true) userPoints += item.points;
    });
    console.log(userPoints);
  };
  return (
    <>
      {list.length === 0 && <Loader />}
      <button className={styles.prevQ} onClick={prevBtnClicked}>
        <img src={arrowPrevious} alt="Previous" />
      </button>
      <button className={styles.nextQ} onClick={nextBtnClicked}>
        <img src={arrowNext} alt="Next" />
      </button>
      <Card className={styles.testHolder}>
        {list.map((data) => (
          <TestItem
            key={data.id}
            id={data.id}
            question={data.question}
            option1={data.option1}
            option2={data.option2}
            option3={data.option3}
            option4={data.option4}
            answer={data.right_anwser}
            choice={data.choice}
            onClick={checkValue}
          />
        ))}
        <button className={styles.submitButton} onClick={submitTest}>Submit</button>
      </Card>
    </>
  );
};

export default Test;
