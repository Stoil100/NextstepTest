import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../UI/Cards/Card";
import styles from "./Chart.module.css";
import TradingViewWidget from "./TradingViewChart";

const CHART_SYMBOLS = [
  { id: 1, symbol: "BTCUSDT" },
  { id: 2, symbol: "ETHUSDT" },
  { id: 3, symbol: "XRPUSDT" },
  { id: 4, symbol: "LTCUSDT" },
  { id: 5, symbol: "BCHUSDT" },
  { id: 6, symbol: "EOSUSDT" },
  { id: 7, symbol: "BNBUSDT" },
  { id: 8, symbol: "ADAUSDT" },
  { id: 9, symbol: "XLMUSDT" },
  { id: 10, symbol: "TRXUSDT" },
  { id: 11, symbol: "USDTUSDT" },
  { id: 12, symbol: "DOGEUSDT" },
  { id: 13, symbol: "DASHUSDT" },
  { id: 14, symbol: "BSVUSDT" },
  { id: 15, symbol: "LINKUSDT" },
  { id: 16, symbol: "NEOUSDT" },
  { id: 17, symbol: "XMRUSDT" },
  { id: 18, symbol: "ATOMUSDT" },
  { id: 19, symbol: "CROUSDT" },
  { id: 20, symbol: "XTZUSDT" },
  { id: 21, symbol: "AAPL" },
  { id: 22, symbol: "GOOG" },
  { id: 23, symbol: "TSLA" },
  { id: 24, symbol: "MSFT" },
  { id: 25, symbol: "AMZN" },
  { id: 26, symbol: "FB" },
  { id: 27, symbol: "BABA" },
  { id: 28, symbol: "BRK.A" },
  { id: 29, symbol: "JNJ" },
  { id: 30, symbol: "V" },
  { id: 31, symbol: "MA" },
  { id: 32, symbol: "WMT" },
  { id: 33, symbol: "PG" },
  { id: 34, symbol: "JPM" },
  { id: 35, symbol: "VZ" },
  { id: 36, symbol: "T" },
  { id: 37, symbol: "HD" },
  { id: 38, symbol: "INTC" },
  { id: 39, symbol: "PFE" },
  { id: 40, symbol: "UNH" },
  { id: 41, symbol: "EURUSD" },
  { id: 42, symbol: "GBPUSD" },
  { id: 43, symbol: "USDJPY" },
  { id: 44, symbol: "USDCHF" },
  { id: 45, symbol: "AUDUSD" },
  { id: 46, symbol: "USDCAD" },
  { id: 47, symbol: "NZDUSD" },
  { id: 48, symbol: "EURGBP" },
  { id: 49, symbol: "EURJPY" },
  { id: 50, symbol: "GBPJPY" },
  { id: 51, symbol: "AUDJPY" },
  { id: 52, symbol: "CHFJPY" },
  { id: 53, symbol: "EURAUD" },
  { id: 54, symbol: "GBPAUD" },
  { id: 55, symbol: "EURCAD" },
  { id: 56, symbol: "GBPCAD" },
  { id: 57, symbol: "EURCHF" },
  { id: 58, symbol: "AUDCAD" },
  { id: 59, symbol: "NZDCAD" },
];

const Chart = () => {
  const [filter, setFilter] = useState("");

  const filteredItems = CHART_SYMBOLS.filter((item) =>
    item.symbol.includes(filter.toUpperCase())
  );
  return (
    <>
      <input
        className={styles.searchInput}
        onChange={(e) => setFilter(e.target.value)}
      ></input>
      <Card className={styles.chartItemsHolder}>
        {filteredItems.map((item) => (
          <Link to={`/charts/${item.symbol}`} key={item.id}>
            Launch {item.symbol} chart
          </Link>
        ))}
      </Card>
    </>
  );
};

export default Chart;
