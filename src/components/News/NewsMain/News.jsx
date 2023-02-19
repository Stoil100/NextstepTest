import React, { useState, useEffect } from "react";
import styles from "./News.module.css";
import Card from "../../UI/Cards/Card";
import Loader from "../../UI/Loader/Loader";
import NewsItem from "../NewsItem/NewsItem";

const News = () => {
  const [list, setList] = useState([]);
  const [giveApiData, setApiData] = useState("");
  console.log(giveApiData);

  useEffect(() => {
    setList([]);
    fetch(`https://nextstep-trading-backend.herokuapp.com/news${giveApiData}/`)
      .then((response) => response.json())
      .then((data) => {
        setList(data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [giveApiData]);

  const setNews = ["business", "crypto", "stocks", "forex"];
  const reEvaluateApiData = (e) => {
    console.log(e.target.value);
    if (e.target.value === "business") {
      setApiData("");
    } else {
      setApiData(`/${e.target.value}`);
    }
  };

  return (
    <>
      {list.length === 0 && <Loader />}
      <Card className={styles.newsBox}>
        <div className={styles.newsButtonsHolder}>
          {setNews.map((item) => (
            <button
              value={item}
              onClick={reEvaluateApiData}
              className={styles.newsButttons}
            >
              {item.toUpperCase()} NEWS
            </button>
          ))}
        </div>
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
