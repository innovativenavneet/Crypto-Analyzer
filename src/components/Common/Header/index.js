import React from "react";
import { Link } from "react-router-dom";
import AnchorTemporaryDrawer from "./drawer";
import Button from "../Button";
import "./style.css";

function Header() {
  return (
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
          
          Compare</p>
      
      
        </Link>

        <Link to="/WatchList">
          <p className="link" >Watchlist</p>
        </Link>

        <Link to="/Dashboard">
          <Button
            text={"Dashboard"}
            outlined={true}
            onClick={() => console.log("Dashboard clicked")}
          />
        </Link>
      </div>
      <div className="mobile-drawer">
        <AnchorTemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
