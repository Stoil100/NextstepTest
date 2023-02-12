import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from './News.module.css'
import Card from "../../UI/Cards/Card";
import Loader from "../../UI/Loader/Loader";
import NewsItem from "../NewsItem/NewsItem";

const News = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
     fetch('http://127.0.0.1:8000/news/crypto/')
        .then((response) => response.json())
        .then((data) => {
           setList(data.results);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);

  console.log(list)

  return (
    <>
    {list.length === 0 && <Loader />}
    <h1 className={styles.newsMainTitle}>Crypto News</h1>
    <Card className={styles.newsBox}>
      {list.length !== 0 &&
        list.map((data) => (
          <NewsItem
            title={data.title}
            description={data.description}
            url={data.link}
          />
        ))}
    </Card>
    </>
  );
};
export default News;
