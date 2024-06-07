import React, { useState, useEffect } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Tooltip } from "@mui/material";
import { convertNumber } from "../../../functions/convertNumber";
import { Link } from "react-router-dom";

function List({ coin, noHover }) {
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

  if (!coin || !coin.symbol) {
    return null; // or render a loading indicator
  }

  return (
    <Link
      to={`/coin/${coin.id}`}
      className={`list-link ${noHover ? "no-hover" : ""}`}
    >
      <tr className={`list-row ${noHover ? "no-hover" : ""}`}>
        {coin && (
          <td className="td-image">
            <img src={coin.image} alt="coin" className="coin-logo" />
          </td>
        )}
        <td className="td-info">
          <div className="name-col">
            <p className="symbol">{coin.symbol}</p>
            <p className="name">{coin.name}</p>
          </div>
        </td>
        {coin.price_change_percentage_24h > 0 ? (
          <td className="chip-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip">
              <TrendingUpRoundedIcon />
            </div>
          </td>
        ) : (
          <td className="chip-flex">
            <div className="price-chip chip-red">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip chip-red">
              <TrendingDownRoundedIcon />
            </div>
          </td>
        )}
        <Tooltip title="Current Price">
          <td>
            <h3
              className="price td-center-align"
              style={{
                color:
                  coin.price_change_percentage_24h < 0
                    ? "var(--red)"
                    : "var(--blue)",
              }}
            >
              ₹{coin.current_price.toLocaleString()}
            </h3>
          </td>
        </Tooltip>
        <Tooltip title="Total Volume" placement="bottom-end">
          <td className="coin-name td-totalVolume">
            <p className="total_volume td-right-align ">
              Vol: ₹{coin.total_volume.toLocaleString()}
            </p>
          </td>
        </Tooltip>
        {isMobile ? (
          <Tooltip title="Market Cap" placement="bottom-end">
            <td className="mobile-td-mkt">
              <p className="total_volume td-right-align">
                ₹{convertNumber(coin.market_cap)}
              </p>
            </td>
          </Tooltip>
        ) : (
          <Tooltip title="Market Cap" placement="bottom-end">
            <td className="Desktop-td-mkt">
              <p className="total_volume td-right-align">
                Cap: ₹{coin.market_cap.toLocaleString()}
              </p>
            </td>
          </Tooltip>
        )}
      </tr>
    </Link>
  );
}

export default List;
