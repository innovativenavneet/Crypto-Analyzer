import React from "react";
import "./style.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
function Grid({ coin }) {
  return (
    <a href={`/coin/${coin.id}`}>
    <div
      className={`grid-container ${
        coin.price_change_percentage_24h < 0 && "grid-container-red"
      }`}
    >
      <div className="info-flex">
        <img src={coin.image} alt="coin" className="coin-logo" />

        <div className="name-col">
          <p className="symbol">{coin.symbol}</p>
          <p className="name">{coin.name}</p>
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
        {/* for finding current price */}
        {/* another way of conditional rendering */}
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
          Total Volume: ₹{coin.total_volume.toLocaleString()}
        </p>
        <p className="total_volume">
          Market Cap: ₹{coin.market_cap.toLocaleString()}
        </p>
      </div>
    </div>
    </a>
  );
}

export default Grid;
