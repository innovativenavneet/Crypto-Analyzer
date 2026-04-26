import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import WatchList from "./pages/WatchList";
import Comparepage from "./pages/Comparepage";
import CoinPage from "./pages/CoinPage";
import WalletPage from "./pages/walletPage";
import AuthModal from "./components/AuthFlow/index";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout } from "./firebase";

function App() {
  // Tracks whether we've received the initial auth state from Firebase.
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleCloseAuthModal = () => {
    setAuthModalOpen(false);
  };

  useEffect(() => {
    logout();

    // Keep UI in sync with Firebase auth across refresh.
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthModalOpen(!user);
      setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  return (
    <div className={`App ${isAuthModalOpen ? 'auth-modal-open' : ''}`}>
      {authChecked && isAuthModalOpen ? (
        <div className="app-layout">
          <div className="main-content">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/WatchList" element={<WatchList />} />
                <Route path="/Comparepage" element={<Comparepage />} />
                <Route path="/coin/:id" element={<CoinPage />} />
                <Route path="/wallet" element={<WalletPage />} />
              </Routes>
            </BrowserRouter>
          </div>
          <div className="auth-panel">
            <AuthModal onClose={handleCloseAuthModal} />
          </div>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/WatchList" element={<WatchList />} />
            <Route path="/Comparepage" element={<Comparepage />} />
            <Route path="/coin/:id" element={<CoinPage />} />
            <Route path="/wallet" element={<WalletPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
