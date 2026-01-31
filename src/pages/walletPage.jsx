import React, { useState } from "react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import SeedPhrase from "../components/Wallet/seedPhrase";
import { SolanaWallet } from "../components/Wallet/Solana/solana";
import "./walletPage.css";

function WalletPage() {
  const [mnemonic, setMnemonic] = useState("");

  const handleMnemonicGenerated = (newMnemonic) => {
    setMnemonic(newMnemonic);
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
            <SeedPhrase onMnemonicGenerated={handleMnemonicGenerated} />
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
