import React from "react";
import { Link } from "react-router-dom";
import AnchorTemporaryDrawer from "./drawer";
import Button from "../Button";
import walletIcon from "../../../assets/wallet.png";
import "./style.css";

function Header() {
  return (
    <>
      <div className="navbar">
        <h1 className="logo">
          CryptoAnalyzer<span style={{ color: "var(--blue)" }}>.</span>
        </h1>
        <div className="links">
          <Link to="/">
            <p className="link">Home</p>
          </Link>

          <Link to="/Comparepage">
            <p className="link" onClick={() => console.log("Compare clicked")}>
              Compare
            </p>
          </Link>

          <Link to="/WatchList">
            <p className="link">Watchlist</p>
          </Link>
          <Link to="/Dashboard">
            <p className="link">Dashboard</p>
          </Link>

          <Link to="/wallet">
            <Button
              text={"Wallet"}
              outlined={true}
              icon={walletIcon}
              onClick={() => console.log("Wallet clicked")}
            />
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="mobile-drawer">
        <AnchorTemporaryDrawer />
      </div>
    </>
  );
}

export default Header;
