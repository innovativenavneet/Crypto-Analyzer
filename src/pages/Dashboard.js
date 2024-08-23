import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import TabsComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import Search from "../components/Dashboard/Search/index";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../../src/components/Common/Loader";
import BackToTOP from "../components/Common/BackToTop";
import { get100Coins } from "../functions/get100coins";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [pageCoins, setPageCoins] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [isloading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var previous = (value - 1) * 10;
    setPageCoins(coins.slice(previous, previous + 10));
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // lets make a function to filter the search result
  var filterCoins = coins.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    // fetch("https://pro-api.coingecko.com/api/v3/coins/list")
    // .then((res)=>res.json())
    // .then(data) => {});
    // we will axios for api call not fetch
    getData();
  }, []);

  const getData = async () => {
    const myCoins = await get100Coins();
    if (myCoins) {
      setCoins(myCoins);
      setPageCoins(myCoins.slice(0, 10));
      setIsLoading(false);
    }
  };
  return (
    <div>
   
      {isloading ? (
        <Loader />
      ) : (
        <div>
             <Header />
             <BackToTOP />
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={search ? filterCoins : pageCoins} />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
           <Footer />
        </div>
      )}
       
    </div>
  );
}

export default Dashboard;
