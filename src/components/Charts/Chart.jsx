import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../UI/Cards/Card";
import styles from "./Chart.module.css";
import TradingViewWidget from "./TradingViewChart";
import Axios from "axios";
import Loader from "../UI/Loader/Loader";

const Chart = () => {
  const [prices, setPrices] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const symbols = [
        "BTC",
        "ETH",
        "ADA",
        "XRP",
        "LTC",
        "EOS",
        "BNB",
        "USDT",
        "BCH",
        "XLM",
        "TRX",
        "DOGE",
        "DASH",
        "BSV",
        "LINK",
        "NEO",
        "XMR",
        "ATOM",
        "CRO",
        "XTZ",
      ];
      const promises = symbols.map((symbol) =>{
        const cacheKey = `crypto-price-${symbol}`;
        const cachedResponse = localStorage.getItem(cacheKey);
        if (cachedResponse) {
          return Promise.resolve(JSON.parse(cachedResponse));
        }
        return Axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols=${symbol}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
        ).then(response => {
          localStorage.setItem(cacheKey, JSON.stringify(response));
          return response;
        });
      });
      const results = await Promise.all(promises);
      const prices = results.reduce((acc, result) => {
        console.log(acc);
        const symbol = result.data[0].symbol + "USDT";
        const currentPrice = result.data[0].current_price;
        const change =
          result.data[0].market_cap_change_percentage_24h.toFixed(2);
        const volume = result.data[0].total_volume;
        const image = result.data[0].image;
        acc[symbol] = { dailyChange: change, volume, image, currentPrice };
        return acc;
      }, {});
      setPrices(prices);
    };

    fetchData();
  }, []);

  /*const filteredItems = CHART_SYMBOLS.filter((item) =>
    item.symbol.includes(filter.toUpperCase())
  );*/
  const symbols = Object.keys(prices).filter((symbol) =>
    symbol.includes(searchTerm)
  );
  const filteredPrices = symbols.reduce((acc, symbol) => {
    acc[symbol] = prices[symbol];
    return acc;
  }, {});
  return (
    <>
    {Object.keys(prices).length===0 && <Loader/>}
          <input
            className={styles.searchInput}
            onChange={(e) => setSearchTerm(e.target.value.toLocaleLowerCase())}
            placeholder={"Напишете символа на валутата която търсите"}
          ></input>
          <Card className={styles.chartItemsHolder}>
            {Object.entries(filteredPrices).map(
              ([symbol, { dailyChange, volume, image, currentPrice }]) => (
                <Link
                  to={`/charts/${symbol}`}
                  key={symbol}
                  className={styles.valueHolder}
                >
                  <img src={image} alt={`${symbol} icon`}></img>
                  <h2>{symbol.toUpperCase()}</h2>
                  <h3>цена {currentPrice} USD</h3>
                  <h4 className={styles.valueDescription}>
                    обмен за деня: {volume}
                  </h4>
                  <h4 className={styles.valueDescription}>
                    промяна за деня: {dailyChange}%
                  </h4>
                  <p className={styles.valueLink}>
                    натиснете за да видите графиката
                  </p>
                </Link>
              )
            )}
          </Card>
    </>
  );
};

export default Chart;
