import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import { CoinObject } from "../functions/CoinObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getPrices";
import LineChart from "../components/Coin/LineChart";
import SelectDays from "../components/Coin/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import PriceType from "../components/Coin/PriceType";

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30); // Changed Setdays to setDays
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState("prices");

  const getData = useCallback(async () => {
    const data = await getCoinData(id);
    if (data) {
      CoinObject(setCoin, data);

      const prices = await getPrices(id, days, priceType);
      if (prices && prices.length > 0) {
        console.log("hey yaaa");

        settingChartData(setChartData, prices);
        setIsLoading(false);
      } else {
        console.error("No prices data available.");
        setIsLoading(false);
      }
    }
  }, [id, days]);

  const handleDaysChange = async (event) => {
    setIsLoading(true);
    setDays(event.target.value);
    const prices = await getPrices(id, event.target.value, priceType);
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  const handlePriceTypeChange = async (event, newType) => {
    setIsLoading(true);
    setPriceType(newType);
    const prices = await getPrices(id, days, newType);
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id, getData]);

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="gray-wrapper">
            <List coin={coin} noHover />
          </div>
          <div className="gray-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <PriceType
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} priceType={priceType} />
          </div>
          <CoinInfo heading={coin.name} desc={coin.desc} />
        </>
      )}
    </div>
  );
}

export default CoinPage;
