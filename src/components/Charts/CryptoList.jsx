import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./CryptoList.module.css";

import Card from "../UI/Cards/Card";

const CryptoList = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchCryptoData = async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          per_page: 200,
          order: "market_cap_desc",
          sparkline: false,
          price_change_percentage: "24h",
          market_cap: true,
          circulating_supply: true,
          total_volume: true,
        },
      }
    );
    console.log(response.data);
    setCryptoList(response.data);
  };

  /*useEffect(() => {
    const cachedData = localStorage.getItem("cryptoData");
    if (cachedData) {
      setCryptoList(JSON.parse(cachedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cryptoData", JSON.stringify(cryptoList));
  }, [cryptoList]);*/

  useEffect(() => {
    fetchCryptoData();
    const intervalId = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const filteredCryptoList = cryptoList.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(filter.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card className={styles.cryptoList}>
      <input
        className={styles.searchInput}
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        placeholder={"Напишете символа на валутата която търсите"}
      />
      <Card className={styles.chartItemsHolder}>
        {filteredCryptoList.map((crypto) => (
          <Link
            to={`/cryptoList/${crypto.symbol.toUpperCase()}USDT`}
            key={crypto.symbol}
            className={styles.valueHolder}
          >
            <h2>{crypto.name}</h2>
            <h3>{crypto.symbol.toUpperCase()}</h3>
            <h4>Current Price: {crypto.current_price}</h4>
            <p>
              Daily Change: {crypto.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p>Market Cap: {crypto.market_cap}</p>
            <p>Circulating Supply: {crypto.circulating_supply}</p>
            <p>Total Volume: {crypto.total_volume}</p>
          </Link>
        ))}
      </Card>
    </Card>
  );
};

export default CryptoList;
