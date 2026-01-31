import React, { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import Button from "../../Common/Button";
import "./solana.css";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);

  function generateSolanaWallet() {
    if (!mnemonic) {
      alert("Please generate a seed phrase first!");
      return;
    }

    try {
      const seed = mnemonicToSeed(mnemonic);
      console.log("seed ", seed);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      console.log("derived seed ", derivedSeed);
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);

      setWallets([
        ...wallets,
        {
          index: currentIndex,
          publicKey: keypair.publicKey.toBase58(),
          secretKey: Buffer.from(secret).toString("hex"),
        },
      ]);

      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      console.error("Error generating wallet:", error);
      alert("Error generating wallet. Please check your seed phrase.");
    }
  }

  return (
    <div className="solana-container">
      <div className="solana-header">
        <h2>Solana Wallets</h2>
        <p>Derive multiple Solana wallets from your seed phrase</p>
      </div>

      <div className="solana-button-wrapper">
        <Button
          text={mnemonic ? "Add Solana Wallet" : "Generate Seed First"}
          outlined={false}
          onClick={generateSolanaWallet}
        />
      </div>

      {wallets.length > 0 && (
        <div className="solana-wallets-list">
          <h3>Your Solana Wallets</h3>
          <div className="wallets-grid">
            {wallets.map((wallet) => (
              <div key={wallet.index} className="wallet-card">
                <div className="wallet-index">Wallet #{wallet.index}</div>
                <div className="wallet-key-section">
                  <label>Public Address:</label>
                  <div className="wallet-key">
                    <span className="key-text">{wallet.publicKey}</span>
                    <button
                      className="copy-key-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(wallet.publicKey);
                        alert("Public key copied!");
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!mnemonic && (
        <div className="empty-state">
          <p>Generate a seed phrase above to start creating Solana wallets</p>
        </div>
      )}
    </div>
  );
}
