import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import WatchList from "./pages/WatchList";
import Comparepage from "./pages/Comparepage";
import CoinPage from "./pages/CoinPage";

// now all of our routes will store here



function App() {
  return (
    <div className="App">
      <BrowserRouter>                    
        <Routes>


          
          <Route path="/"                   element={<Home />} />
          <Route path="/Dashboard"     element={<Dashboard />} />
          <Route path="/WatchList"     element={<WatchList />} />
          <Route path="/Comparepage" element={<Comparepage />} />
          <Route path="/coin/:id"       element={<CoinPage />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
