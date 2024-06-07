import React  from "react";
import "./style.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function Search({ search, onSearchChange }) {
  // we are passing search as a prop so that we can use it to to store the searchvalue and when
  // something is searched the onchange event will trigger and store the value on onSearchCHange from
  // !!! Dashboard !!!

  return (
    <div className="search-flex">
      <div className="search">
        <SearchRoundedIcon />
      </div>

      <input
        placeholder="Search Coins"
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e)}
      />
    </div>
  );
}

export default Search;
