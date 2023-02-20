import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import Card from "../../UI/Cards/Card";
import styles from "./Test.module.css";

import TestItem from "../TestItem/TestItem";
import arrowNext from "../../../assets/arrowNext.svg";
import arrowPrevious from "../../../assets/arrowPrevious.svg";
import Loader from "../../UI/Loader/Loader";
import SubmitTestModal from "../../UI/SubmitModals/SubmitTestModal";

const Test = (props) => {
  const params = useParams();
  const [userPoints,setUserPoints]=useState();
  let [list, setList] = useState([]);
  const navigate=useNavigate();
  let counter = 1;
  console.log(userPoints)

  useEffect(() => {
    fetch("https://nextstep-trading-backend.herokuapp.com/knowledge_quiz/quiz/")
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
    console.log(value,id);
    console.log(list)
    if (list.at(id-8).rightAnswer === value) {
      list.at(id - 8).choice = true;
    } else {
      list.at(id - 8).choice = false;
    }
    console.log(list.at(id - 8).choice);
  };
  const prevBtnClicked = () => {
    if (counter !== 0) {
      counter--;
    }
    window.scrollTo(0, window.innerHeight * counter);
  };
  const nextBtnClicked = () => {
    if (counter !== 100) {
      counter++;
    }

    window.scrollTo(0, window.innerHeight * counter);
  };
  const submitTest = () => {
    let sumUserPoints=0;
    list.forEach((item) => {
      if (item.choice === true) sumUserPoints += item.points;
    });
    console.log(sumUserPoints)
    localStorage.setItem("pointsValue",sumUserPoints)
    setUserPoints(sumUserPoints);
  };
  const confirmSubmit=()=>{
    console.log("hello")
    navigate("/profile");
  }
  return (
    <>
    {userPoints!==undefined&&<SubmitTestModal userPoints={userPoints} onClick={confirmSubmit}/>}
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
