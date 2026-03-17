import React, { useState } from "react";
import { generateMnemonic } from "bip39";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import SeedPhrase from "../components/Wallet/SeedPhrase/seedPhrase";
import { SolanaWallet } from "../components/Wallet/Solana/solana";
import "./walletPage.css";

function WalletPage() {
  // a 12, 18, or 24-word "seed phrase" (or secret phrase) that acts as the master key to your crypto wallet.
  // It allows you to recover your wallet, SOL, and tokens across different apps or if your device is lost
  const [mnemonic, setMnemonic] = useState("");

  const handleGenerate = () => {
    const mn = generateMnemonic();
    setMnemonic(mn);
  };

  return (
    <>
      <Header />
      <div className="wallet-page-container">
        <div className="wallet-page-hero">
          <h1>Wallet Manager</h1>
          <p>Generate seed phrases and derive blockchain wallets securely</p>
        </div>

        <div className="wallet-page-content">
          <div className="wallet-section seed-section">
            <SeedPhrase mnemonic={mnemonic} onGenerate={handleGenerate} />
          </div>

          <div className="wallet-divider"></div>

          <div className="wallet-section solana-section">
            <SolanaWallet mnemonic={mnemonic} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WalletPage;
