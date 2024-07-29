import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header/index";
import SelectCoins from "../components/Comparepage/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import { CoinObject } from "../functions/CoinObject";
import { settingChartData } from "../functions/settingChartData.js";
import { FirstPage } from "@mui/icons-material";
import { getCoinData } from "../functions/getCoinData.js";
import { getPrices } from "../functions/getPrices.js";
import Loader from "../components/Common/Loader/index.js";

function Comparepage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("etherum");
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [days, setDays] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");

  function handleDaysChange(event) {

    
    setDays(event.target.value);
  }

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setIsLoading(true);
    const data1 = await getCoinData(crypto1);
    const data2 = await getCoinData(crypto2);
    if (data1) {
      CoinObject(setCrypto1Data, data1);
    }
    if (data2) {
      CoinObject(setCrypto1Data, data2);
    }

    if (data1 && data2) {
      const prices1 = await getPrices(crypto1, days, "Prices");
      const prices2 = await getPrices(crypto1, days, "Prices");
      if (prices1 && prices1.length > 0 && prices2 && prices2.length > 0) {
        console.log("Both prices fetched", prices1, prices2);

        // settingChartData(setChartData, prices);
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

      // settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default Comparepage;
