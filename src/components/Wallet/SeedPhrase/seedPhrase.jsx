import React, { useState } from "react";
import { generateMnemonic } from "bip39";
import Button from "../../Common/Button/index";
import "./seedPhrase.css";

function SeedPhrase() {
  const [mnemonic, setMnemonic] = useState("");
  const [copied, setCopied] = useState(false);

  function generateWalletMnemonic() {
    const mn = generateMnemonic();
    console.log("mn", mn);
    setMnemonic(mn);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(mnemonic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const words = mnemonic.split(" ");

  return (
    <div className="seed-phrase-container">
      <div className="seed-phrase-header">
        <h2>Generate Seed Phrase</h2>
        <p>Securely create your wallet's recovery phrase</p>
      </div>

      <div className="seed-phrase-button-wrapper">
        <Button
          text="Create Seed Phrase"
          outlined={false}
          onClick={generateWalletMnemonic}
        />
      </div>

      {mnemonic && (
        <div className="seed-phrase-content">
          <div className="seed-phrase-words">
            {words.map((word, index) => (
              <div key={index} className="seed-word-box">
                <span className="seed-word-number">{index + 1}</span>
                <span className="seed-word-text">{word}</span>
              </div>
            ))}
          </div>

          <button className="copy-button" onClick={copyToClipboard}>
            {copied ? "✓ Copied!" : "📋 Copy All"}
          </button>
        </div>
      )}

      {copied && <div className="copy-popup">Copied to clipboard!</div>}
    </div>
  );
}

export default SeedPhrase;
