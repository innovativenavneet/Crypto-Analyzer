import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import Search from "../components/Dashboard/Search/index";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../../src/components/Common/Loader";
import BackToTOP from "../components/Common/BackToTop";


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
    // we will axios for api call not fetch\

    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        // code for handling the response
        console.log("RESPONSE>>>", response);
        setCoins(response.data);
        setPageCoins(response.data.slice(0, 10));
        setIsLoading(false);
      })
      .catch((error) => {
        // code for handling the error
        console.log("ERROR", error);
      });
  }, []);
  return (
    <div>
      <Header />
         <BackToTOP />
      {isloading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={search ? filterCoins : pageCoins} />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
