import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Card from "../../UI/Cards/Card";
import styles from "./CourseItem.module.css";

const CourseItem = (props) => {
  const params = useParams();

  const location = useLocation();
  const data = location.state?.data;
  console.log(data);
  let testId = params.courseId.slice(-1);
  return (
    <Card className={styles.courseBox}>
      <h1 className={styles.courseTitle}>{data.title}</h1>
      <div className={styles.courseHolder}>
        <p className={styles.courseDescription}>{data.description}</p>
      </div>
      <Link to={`/Test/${testId}`} className={styles.testAnchor}>Направете теста</Link>
    </Card>
  );
};
export default CourseItem;
