import React from "react";
import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Grid from "../Grid";
import List from "../List";
import "./style.css";

export default function TabsComponent({ coins }) {
  const [value, setValue] = useState("grid");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    color: "var(--white)",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4fe857",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <TabList onChange={handleChange} variant="fullWidth">
          <Tab label="Grid" value="grid" sx={style} />
          <Tab label="List" value="list" sx={style} />
        </TabList>

        <TabPanel value="grid">
          {/* Divide coins into chunks of 4 */}
          {coins.reduce((rows, coin, index) => {
            if (index % 4 === 0) rows.push([]);
            rows[rows.length - 1].push(coin);
            return rows;
          }, []).map((row, rowIndex) => (
            <div className="grid-flex" key={rowIndex}>
              {/* Map each row of coins */}
              {row.map((coin, coinIndex) => (
                <Grid coin={coin} key={coinIndex} />
              ))}
            </div>
          ))}
        </TabPanel>
        <TabPanel value="list">
          <table>
            {coins.map((item, i) => {
              return <List coin={item} key={i} />;
            })}
          </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
