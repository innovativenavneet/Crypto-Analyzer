import React, { useState, useEffect } from "react";
import "./style.css"; // Ensure this is your existing CSS file
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";

function Grid({ coin, delay }) {
  const [isCoinAdded, setIsCoinAdded] = useState(false);

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

  return (
    <a href={`/coin/${coin.id}`}>
      <div
        className={`grid-container ${
          coin.price_change_percentage_24h < 0 ? "grid-container-red" : ""
        }`}
      >
        <div className="info-flex">
          <img src={coin.image} alt="coin" className="coin-logo" />
          <div className="name-col">
            <p className="symbol">{coin.symbol}</p>
            <p className="name">{coin.name}</p>
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

        {coin.price_change_percentage_24h > 0 ? (
          <div className="chip-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip">
              <TrendingUpRoundedIcon />
            </div>
          </div>
        ) : (
          <div className="chip-flex">
            <div className="price-chip chip-red">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip chip-red">
              <TrendingDownRoundedIcon />
            </div>
          </div>
        )}

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
            ${coin.current_price.toLocaleString()}
          </h3>
          <p className="total_volume">
            Total Volume: ${coin.total_volume.toLocaleString()}
          </p>
          <p className="total_volume">
            Market Cap: ${coin.market_cap.toLocaleString()}
          </p>
        </div>
      </div>
    </a>
  );
}

export default Grid;
