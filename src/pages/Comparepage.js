import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header/index";
import Footer from "../components/Common/Footer/index.js";
import SelectCoins from "../components/Comparepage/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import { CoinObject } from "../functions/CoinObject";
import { settingChartData } from "../functions/settingChartData.js";
import { FirstPage } from "@mui/icons-material";
import { getCoinData } from "../functions/getCoinData.js";
import { getPrices } from "../functions/getPrices.js";
import Loader from "../components/Common/Loader/index.js";
import List from "../components/Dashboard/List/index.js";
import CoinInfo from "../components/Coin/CoinInfo/index.js";
import LineChart from "../components/Coin/LineChart";
import TogglePriceType from "../components/Coin/PriceType/index.js";

function Comparepage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [days, setDays] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");

  const [chartData, setChartData] = useState({});

  async function handleDaysChange(event) {
    setIsLoading(true);
    
    setDays(event.target.value);
    const prices1 = await getPrices(crypto1, event.target.value, priceType);
    const prices2 = await getPrices(crypto2, event.target.value, priceType);
    settingChartData(setChartData,prices1, prices2);
    setIsLoading(false);
  }
  const handlePriceTypeChange = async (event, newType) => {
    setIsLoading(true);

    setPriceType(newType);
    const prices1 = await getPrices(crypto1, days, newType);
    const prices2 = await getPrices(crypto2, days, newType);
    settingChartData(setChartData,prices1, prices2);
      setIsLoading(false);
    
  };

  useEffect(() => {
    getData();
  }, [crypto1, crypto2, days]);

  async function getData() {
    setIsLoading(true);
    const data1 = await getCoinData(crypto1);
    const data2 = await getCoinData(crypto2);

    if (data1) {
      CoinObject(setCrypto1Data, data1);
    }
    if (data2) {
      CoinObject(setCrypto2Data, data2);
    }

    if (data1 && data2) {
      const prices1 = await getPrices(crypto1, days, "prices");
      const prices2 = await getPrices(crypto2, days, "prices");

      if (prices1 && prices1.length > 0 && prices2 && prices2.length > 0) {
        console.log("Both prices fetched", prices1, prices2);
      settingChartData(setChartData, prices1, prices2);
        setIsLoading(false);
      }
    }
  }

  const handleCoinChange = async (event, isCoin2) => {
    setIsLoading(true);
    if (isCoin2) {
      setCrypto2(event.target.value);
      console.log("Crypto2 id", event.target.value);
      const data = await getCoinData(event.target.value);
      CoinObject(setCrypto2Data, data);
    } else {
      setCrypto1(event.target.value);
      const data = await getCoinData(event.target.value);
      CoinObject(setCrypto1Data, data);
    }

    const prices1 = await getPrices(crypto1, days, priceType);
    const prices2 = await getPrices(crypto2, days, priceType);

    if (prices1 && prices1.length > 0 && prices2 && prices2.length > 0) {
      console.log("Both prices fetched", prices1, prices2);
      settingChartData(setChartData, prices1, prices2);
      setIsLoading(false);
    }
  };

  return (
    <div>
     
      {isLoading ? (
        <Loader />
      ) : (
        <>
         <Header />
          <div className="coins-days-flex">
            <SelectCoins
              crypto1={crypto1}
              handleCoinChange={handleCoinChange}
              crypto2={crypto2}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPTag={true}
            />
          </div>
          <div className="gray-wrapper" style={{ padding: "0rem 1rem" }}>
            <List coin={crypto1Data} />
          </div>
          <div className="gray-wrapper" style={{ padding: "0rem 1rem" }}>
            <List coin={crypto2Data} />
          </div>
          <div className="gray-wrapper">
           
            <TogglePriceType
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} priceType={priceType} multiAxis={true}/>
          </div>
          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
          <Footer/>
        </>
      )}

    </div>
  );
}

export default Comparepage;
