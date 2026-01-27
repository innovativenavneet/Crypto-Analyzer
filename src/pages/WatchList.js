import React, { useEffect, useState } from "react";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100coins";

function Watchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const watchlistData = JSON.parse(localStorage.getItem("watchlist"));
      if (watchlistData) {
        const allCoins = await get100Coins();
        if (allCoins) {
          setCoins(allCoins.filter((coin) => watchlistData.includes(coin.id)));
        }
      }
    };
    
    if (watchlist) {
      getData();
    }
  }, [watchlist]);

  return (
    <div>
      <Header />
      {watchlist?.length > 0 ? (
        <TabsComponent coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
          <Footer/>
        </div>
      )}
    
    </div>
  );
}

export default Watchlist;