import React, { useState, useEffect } from "react";
import styles from "./News.module.css";
import Card from "../../UI/Cards/Card";
import Loader from "../../UI/Loader/Loader";
import NewsItem from "../NewsItem/NewsItem";

const News = () => {
  const [list, setList] = useState([]);
  const [giveApiData, setApiData] = useState("");

  useEffect(() => {
    setList([]);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://nextstep-trading-backend.herokuapp.com/news${giveApiData}/`
        );
        const data = await response.json();
        setList(data.results);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [giveApiData]);

  const setNews = ["business", "crypto", "stocks", "forex"];

  const reEvaluateApiData = (e) => {
    if (e.target.value === "business") {
      setApiData("");
    } else {
      setApiData(`/${e.target.value}`);
    }
  };

  return (
    <>
      {list?.length === 0 && <Loader />}
      <Card className={styles.newsBox}>
        <div className={styles.newsButtonsHolder}>
          {setNews.map((item) => (
            <button
              key={item}
              value={item}
              onClick={reEvaluateApiData}
              className={styles.newsButttons}
            >
              {item.toUpperCase()} NEWS
            </button>
          ))}
        </div>
        {list?.length !== 0 &&
          list.map((data) => (
            <NewsItem
              key={data.id}
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
