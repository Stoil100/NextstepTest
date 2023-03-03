import axios from "axios";
import React, { useState, useEffect,useMemo,useCallback } from "react";
import { Link } from "react-router-dom";

import styles from "./CryptoList.module.css";

import Card from "../UI/Cards/Card";
import Loader from "../UI/Loader/Loader";

const CryptoList = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("market_cap_rank");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchCryptoData = async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          per_page: 1000,
          order: "market_cap_desc_asc",
          sparkline: false,
          price_change_percentage: "24h",
          market_cap: true,
          circulating_supply: true,
          total_volume: true,
        },
      }
    );
    setCryptoList(response.data);
  };

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
  const handleSortChange = useCallback((key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }, [sortKey, sortOrder]);

  const sortedCryptoList = useMemo(() =>
  filteredCryptoList.sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (sortKey === "total_volume") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
  }), [filteredCryptoList, sortKey, sortOrder]);

  return (
    <>
    {filteredCryptoList.length===0&&<Loader/>}
    <Card className={styles.cryptoList}>
      <input
        className={styles.searchInput}
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        placeholder={"Напишете символа на валутата която търсите"}
      />
      <div className={styles.sortingBox}>
        <h2>Sort By: </h2>
        <div className={styles.sortItems}>
          <button onClick={() => handleSortChange("market_cap_rank")}>
            Market Cap Rank
          </button>
          <button onClick={() => handleSortChange("current_price")}>
            Price
          </button>
          <button
            onClick={() => handleSortChange("price_change_percentage_24h")}
          >
            Price Change (24h)
          </button>
          <button onClick={() => handleSortChange("total_volume")}>
            Volume (24h)
          </button>
        </div>
      </div>
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
    </>
  );
};

export default CryptoList;
