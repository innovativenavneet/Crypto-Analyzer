import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import WatchList from "./pages/WatchList";
import Comparepage from "./pages/Comparepage";
import CoinPage from "./pages/CoinPage";
import AuthModal from "./components/AuthFlow/index";
import Wallet from "./WalletFlow/pages/Wallet";
import "../src/components/Auth/style.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  // Tracks whether we've received the initial auth state from Firebase.
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleCloseAuthModal = () => {
    setAuthModalOpen(false);
  };

  useEffect(() => {
    // Keep UI in sync with Firebase auth across refresh.
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthModalOpen(!user);
      setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/WatchList" element={<WatchList />} />
          <Route path="/Comparepage" element={<Comparepage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </BrowserRouter>
      {authChecked && isAuthModalOpen && (
        <AuthModal onClose={handleCloseAuthModal} />
      )}
    </div>
  );
}

export default App;
