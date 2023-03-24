import axios from "axios";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./CryptoList.module.css";
import Loader from "../UI/Loader/Loader";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputBase,
  ButtonGroup,
  Pagination,
} from "@mui/material";

// import styled from "styled-components";

// const CryptoListCard = styled(Card)({
//   marginTop: "16px",
//   width: "100%",
//   boxShadow: "none",
//   border: "1px solid #e3e3e3",
// });

const CryptoList = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("market_cap_rank");
  const [sortOrder, setSortOrder] = useState("asc");
  const [hoveredCrypto, setHoveredCrypto] = useState(null);
  const [page, setPage] = useState(1);

  const fetchCryptoData = async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          per_page: 250,
          order: "market_cap_desc_asc",
          sparkline: true,
          price_change_percentage: "24h",
          market_data: true,
          market_cap: true,
          circulating_supply: true,
          total_volume: true,
        },
      }
    );

    const cryptoList = response.data;
    setCryptoList(cryptoList);
    console.log(cryptoList[0]);
  };

  useEffect(() => {
    fetchCryptoData();
    const intervalId = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const getCryptoGraph = (chart) => {
    const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(
      JSON.stringify({
        type: "sparkline",
        data: {
          labels: [
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
          ],
          datasets: [
            {
              label: "Price",
              data: chart,
              borderColor: "rgba(255, 99, 132, 1)",
              fill: false,
              values: `${chart.join(",")}`,
            },
          ],
        },
        options: { axes: { y: { labels: { position: "left" } } } },
      })
    )}`;
    return chartUrl;
  };

  const itemsPerPage = 10;
  const totalItems = cryptoList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const filteredCryptoList = cryptoList.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(filter.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(filter.toLowerCase())
  );
  const pageFilteredCryptoList = filteredCryptoList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const handleSortChange = useCallback(
    (key) => {
      if (sortKey === key) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortKey(key);
        setSortOrder("asc");
      }
    },
    [sortKey, sortOrder]
  );

  const sortedCryptoList = useMemo(
    () =>
      pageFilteredCryptoList.sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        if (sortKey === "total_volume") {
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        } else {
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        }
      }),
    [pageFilteredCryptoList, sortKey, sortOrder]
  );
  const handleCryptoHover = (crypto) => {
    console.log(typeof crypto.graph);
    if (crypto !== null || crypto.graph===undefined) {
      crypto.graph = getCryptoGraph(crypto.sparkline_in_7d.price.reverse());
    }
    setHoveredCrypto(crypto);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {cryptoList.lenght === 0 ? (
        <Loader />
      ) : (
        <Grid
          container
          spacing={2}
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.253)", padding: 2 }}
        >
          <Grid item xs={12} md={6}>
            <Box sx={{mt:"16px",width:"100%",border:1,borderColor:"#e3e3e3",boxShadow:"none",backgroundColor:"#fff",borderRadius:"5px"}}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputBase
                      fullWidth
                      placeholder="Search crypto"
                      onChange={(e) => setFilter(e.target.value)}
                      sx={{border:1 ,borderColor:"#e3e3e3",borderRadius:"5px"}}
                    />
                  </Grid>
                  <Grid item>
                    <div>
                      <Typography variant="h6">Sort By:</Typography>
                      <ButtonGroup variant="text">
                        <Button
                          onClick={() => handleSortChange("market_cap_rank")}
                        >
                          Market Cap Rank
                        </Button>
                        <Button
                          onClick={() => handleSortChange("current_price")}
                        >
                          Price
                        </Button>
                        <Button
                          onClick={() =>
                            handleSortChange("price_change_percentage_24h")
                          }
                        >
                          Price Change (24h)
                        </Button>
                        <Button
                          onClick={() => handleSortChange("total_volume")}
                        >
                          Volume (24h)
                        </Button>
                      </ButtonGroup>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    {hoveredCrypto && (
                      <Box sx={{mt:"16px",width:"100%",border:1,borderColor:"#e3e3e3",boxShadow:"none",backgroundColor:"#fff",borderRadius:"5px",display: "flex"}}>
                        <CardContent>
                          <Typography variant="h6">
                            {hoveredCrypto.name}
                          </Typography>
                          <Typography variant="subtitle1">
                            {hoveredCrypto.symbol.toUpperCase()}
                          </Typography>
                          <Typography variant="body1">
                            Current Price: {hoveredCrypto.current_price}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color:
                                parseFloat(
                                  hoveredCrypto.price_change_percentage_24h
                                ).toFixed(2) > 0
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {parseFloat(
                              hoveredCrypto.price_change_percentage_24h
                            ).toFixed(2)}
                            %
                          </Typography>
                          <Typography variant="body1">
                            Market Cap: {hoveredCrypto.market_cap}
                          </Typography>
                          <Typography variant="body1">
                            Circulating Supply:{" "}
                            {hoveredCrypto.circulating_supply}
                          </Typography>
                          <Typography variant="body1">
                            Total Volume: {hoveredCrypto.total_volume}
                          </Typography>
                        </CardContent>
                        <img
                          src={hoveredCrypto.graph}
                          style={{ height: "200px", width: "400px" }}
                        />
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Box sx={{mt:"16px",width:"100%",border:1,borderColor:"#e3e3e3",boxShadow:"none",backgroundColor:"#fff",borderRadius:"5px"}}>
                <CardContent>
                  {pageFilteredCryptoList.map((crypto) => (
                    <Box
                      onMouseEnter={() => handleCryptoHover(crypto)}
                      onMouseLeave={() => handleCryptoHover(null)}
                      key={crypto.symbol}
                      component={Link}
                      to={`/cryptoList/${crypto.symbol.toUpperCase()}USDT`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        color: "black",
                        padding: 1,
                      }}
                    >
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        style={{ height: "32px",marginRight:10}}
                      />
                      <Typography variant="h6" sx={{flex:1.5}}>{crypto.name}</Typography>
                      <Typography variant="subtitle1" sx={{flex:0.5}}>
                        {crypto.symbol.toUpperCase()}
                      </Typography>
                      <Typography variant="body1" sx={{flex:1}}>
                        Current Price: {crypto.current_price}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
                <Box xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    size="small"
                    color="primary"
                    sx={{
                      position: "relative",
                      maxWidth: "sm",
                      backgroundColor: "white",
                      zIndex: 2,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CryptoList;
