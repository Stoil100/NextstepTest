import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Test.module.css";

import TestItem from "../TestItem/TestItem";
import arrowNext from "../../../assets/arrowNext.svg";
import arrowPrevious from "../../../assets/arrowPrevious.svg";
import Loader from "../../UI/Loader/Loader";
import SubmitTestModal from "../../UI/SubmitModals/SubmitTestModal";

const Test = () => {
  const testHolderRef = useRef(null);
  const params = useParams();
  const [userPoints, setUserPoints] = useState();
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  let counter = 0;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://nextstep-trading-backend.herokuapp.com/knowledge_quiz/quiz/"
      );
      const data = await response.json();
      const quizQuestions = data
        .filter((item) => item.article_id === parseInt(params.testId))
        .flatMap((item) => item.quiz_questions);
      setList(quizQuestions);
    } catch (err) {
      console.log(err.message);
    }
  }, [params.testId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const checkValue = useCallback((value, id) => {
    const index = id - list[0].id;
    if (list[index].rightAnswer === value) {
      setList((list) =>
        list.map((item, i) => (i === index ? { ...item, choice: true } : item))
      );
    } else {
      setList((list) =>
        list.map((item, i) => (i === index ? { ...item, choice: false } : item))
      );
    }
  },[list]);

  const prevBtnClicked = useCallback(() => {
    if (counter !== 0) {
      counter--;
      console.log(testHolderRef.current)
      testHolderRef.current.children[counter].scrollIntoView({
        behavior: "smooth",
        block:"end"
      });
    }
  }, [counter]);
  
  const nextBtnClicked = useCallback(() => {
    if (counter !== 100) {
      counter++;
      testHolderRef.current.children[counter].scrollIntoView({
        behavior: "smooth",
        block:"end"
      });
    }
  }, [counter]);
  

  const submitTest = useCallback(() => {
    const sumUserPoints = list.reduce((sum, item) => {
      return item.choice === true ? sum + item.points : sum;
    }, 0);
    const localPointsValue = localStorage.getItem("pointsValue") || 0;
    localStorage.setItem("pointsValue", parseInt(localPointsValue) + sumUserPoints);
    setUserPoints(sumUserPoints);
  },[list]);

  const confirmSubmit = useCallback(() => {
    navigate("/profile");
  },[]);

  return (
    <>
      {userPoints !== undefined && (
        <SubmitTestModal userPoints={userPoints} onClick={confirmSubmit} />
      )}
      {list.length === 0 && <Loader />}
      <button className={styles.prevQ} onClick={prevBtnClicked}>
        <img src={arrowPrevious} alt="Previous" />
      </button>
      <button className={styles.nextQ} onClick={nextBtnClicked}>
        <img src={arrowNext} alt="Next" />
      </button>
      <div className={styles.testHolder} ref={testHolderRef}>
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
        <button className={styles.submitButton} onClick={submitTest}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Test;
