import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Course.module.css";
import Card from "../../UI/Cards/Card";
import Loader from "../../UI/Loader/Loader";

const Course = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("https://nextstep-trading-backend.herokuapp.com/courses/article/")
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      {list.length === 0 && <Loader />}
      <h1 className={styles.courseTitle}>Курсове</h1>
      <Card className={styles.coursesBox}>
        {list.length !== 0 &&
          list.map((data) => (
            <Link
              to={`/courses/:course${data.id}`}
              state={{
                data: data,
              }}
              className={styles.courseItem}
              key={data.title}
            >
              <h1>{data.title}</h1>
              <div className={styles.courseDescriptionLevelHolder}>
                <h2>Ниво: {data.knowledge_level}</h2>
                <h3>Време за четене: {data.established_time}</h3>
              </div>
            </Link>
          ))}
      </Card>
    </>
  );
};
export default Course;
