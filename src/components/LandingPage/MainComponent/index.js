
import React from "react";
import "./style.css";
import Button from "../../Common/Button";
import Phone from "../../../assets/phone.png";
import Desktop from "../../../assets/desktop.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Maincomponent() {
  const handleDashboardClick = () => {
    console.log("Dashboard button clicked");
  };

  const handleShareClick = () => {
    const shareLink = "https://66c8cad5e850fc90364462e8--navneetprakash.netlify.app/"; 
    navigator.clipboard.writeText(shareLink).then(() => {
      alert("Link copied to clipboard!");
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="Flex-info">
      <div className="left-component">
        <motion.h1
          className="track-heading"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          Crypto Analysis
        </motion.h1>

        <motion.h1
          className="real-time"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          In Real Time.
        </motion.h1>

        <motion.p
          className="para"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.75 }}
        >
          Experience live Crypto tracking through a public API! Dive into the
          Dashboard and explore in real-time!
        </motion.p>

        <motion.div
          className="bottombtn"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, delay: 0.8 }}
        >
          <Link to="/Dashboard">
            <Button
              text={"Dashboard"}
              outlined={true}
              onClick={handleDashboardClick}
            />
          </Link>

          <Button text={"Share"} outlined={true} onClick={handleShareClick} />
        </motion.div>
      </div>
      <div className="animation">
        <motion.img
          src={Phone}
          alt=""
          className="phone"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
        />
        <motion.img
          src={Desktop}
          alt=""
          className="desktop"
          initial={{ x: -10 }}
          animate={{ x: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}


