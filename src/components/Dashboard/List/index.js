import React, { useState, useEffect } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { Tooltip } from "@mui/material";
import { convertNumber } from "../../../functions/convertNumber";
import { Link } from "react-router-dom";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";

function List({ coin, noHover }) {
  const [isCoinAdded, setIsCoinAdded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    // Initial check on component mount
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setIsCoinAdded(watchlist.includes(coin.id));
  }, [coin.id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent default action

    if (isCoinAdded) {
      // Remove item from watchlist
      removeItemToWatchlist(e, coin.id, (updated) => setIsCoinAdded(updated));
    } else {
      // Add item to watchlist
      saveItemToWatchlist(e, coin.id, () => setIsCoinAdded(true));
    }
  };

  if (!coin || !coin.symbol) {
    return null; // or render a loading indicator
  }

  return (
    <Link
      to={`/coin/${coin.id}`}
      className={`list-link ${noHover ? "no-hover" : ""}`}
    >
      <div
        className={`list-row ${noHover ? "no-hover" : ""}`}
      >
        <div className="td-image">
          <img src={coin.image} alt="coin" className="coin-logo" />
        </div>
        <div className="td-info">
          <div className="name-col">
            <p className="symbol">{coin.symbol}</p>
            <p className="name">{coin.name}</p>
          </div>
        </div>
        <div className="chip-flex">
          {coin.price_change_percentage_24h > 0 ? (
            <>
              <div className="price-chip">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="icon-chip">
                <TrendingUpRoundedIcon />
              </div>
            </>
          ) : (
            <>
              <div className="price-chip chip-red">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="icon-chip chip-red">
                <TrendingDownRoundedIcon />
              </div>
            </>
          )}
        </div>
        <div className="info-container">
          <h3
            className="price"
            style={{
              color:
                coin.price_change_percentage_24h < 0
                  ? "var(--red)"
                  : "var(--blue)",
            }}
          >
            ₹{coin.current_price.toLocaleString()}
          </h3>
          <p className="total_volume">
            Vol: ₹{coin.total_volume.toLocaleString()}
          </p>
          {isMobile ? (
            <p className="total_volume">
              {convertNumber(coin.market_cap)}
            </p>
          ) : (
            <p className="total_volume">
              Cap: ₹{coin.market_cap.toLocaleString()}
            </p>
          )}
        </div>
        <div
          className={`favorite-icon-container ${isCoinAdded ? 'favorite-icon-active' : ''}`}
          onClick={handleFavoriteClick}
        >
          <div className="favorite-icon">
            {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
          </div>
          <span className={`tooltip-text ${isCoinAdded ? 'tooltip-text-active' : ''}`}>
            {isCoinAdded ? 'Added to watchlist !!!' : 'Want to add this in watchlist ??'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default List;
