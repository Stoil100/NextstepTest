import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './Course.module.css';
import Card from "../../UI/Cards/Card";
import Loader from "../../UI/Loader/Loader";
import CourseItem from "../CourseItems/CourseItem";

const Course = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
     fetch('http://127.0.0.1:8000/courses/article/')
        .then((response) => response.json())
        .then((data) => {
           setList(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);

  console.log(list)

  return (
    <>
    {list.length === 0 && <Loader />}
    <h1>Courses</h1>
    <Card className={styles.coursesBox}>
      {list.length !== 0 &&
        list.map((data) => (
          <Link
            to={`/courses/:course${data.id}`}
          >
            <h1>{data.title}</h1>
          </Link>
        ))}
    </Card>
    </>
  );
};
export default Course;
