import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import WatchList from "./pages/WatchList";
import Comparepage from "./pages/Comparepage";
import CoinPage from "./pages/CoinPage";
import AuthModal from "../src/components/LandingPage1/index";
import "../src/components/Auth/style.css";

function App() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(true);

  const handleCloseAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/WatchList" element={<WatchList />} />
          <Route path="/Comparepage" element={<Comparepage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
      {isAuthModalOpen && <AuthModal onClose={handleCloseAuthModal} />}
    </div>
  );
}

export default App;
