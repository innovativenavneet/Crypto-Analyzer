import React from "react";
import "./style.css";

function Button({ text, onClick, outlined, icon }) {
  return (
    <div
      className={outlined ? "outlined-btn" : "btn"}
      onClick={() => onClick()}
    >
      {text}
      {icon && <img src={icon} alt="icon" className="btn-icon" />}
    </div>
  );
}
export default Button;
