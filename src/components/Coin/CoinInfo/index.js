import React, { useState } from "react";
import "./style.css";

function CoinInfo({ heading, desc }) {
  const shortDesc =
    desc.slice(0, 400) + "<span class='read-more'> Read More...</span>";
  const longDesc = desc + "<span class='read-less'> Read Less...</span>";

  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    setFlag(!flag);
  };

  return (
    <div className="gray-wrapper">
      <h2 className="coin-info-heading">{heading}</h2>
      {desc.length > 350 ? (
        <p
          className="coin-info-desc"
          onClick={handleClick}
          dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longDesc }}
        />
      ) : (
        <p
          className="coin-info-desc"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      )}
    </div>
  );
}

export default CoinInfo;
