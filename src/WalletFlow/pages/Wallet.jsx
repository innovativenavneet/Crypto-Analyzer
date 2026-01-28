// import React, { useState } from "react";
// import Header from "../../src/components/Common/Header";
// import Footer from "../../src/components/Common/Footer";
// import { generateMnemonic } from "bip39";
// import Button from "../../src/components/Common/Button";

// function Wallet() {
//   const [memonic, setMemonic] = useState("");
//   async function generateWalletMnemonic() {
//     const mn = generateMnemonic();
//     setMemonic(mn);
//   }
//   return (
//     <div>
//       <Header />
//       <div>Hey i am wallet</div>
//       <Button
//         text={"Generate memonic"}
//         outlined={true}
//         onClick={generateWalletMnemonic}
//       />

//       <Footer />
//     </div>
//   );
// }

// export default Wallet;
import React, { useState } from "react";
import Header from "../../components/Common/Header/index";
import Footer from "../../components/Common/Footer/index";
import { generateMnemonic } from "bip39";
import Button from "../../components/Common/Button/index";

function Wallet() {
  const [mnemonic, setMnemonic] = useState("");

  function generateWalletMnemonic() {
    const mn = generateMnemonic();
    console.log("mn",mn)
    setMnemonic(mn);
  }

  return (
    <>
      <Header />
      <div>Hey i am wallet</div>

      <Button
        text="Generate mnemonic"
        outlined={true}
        onClick={generateWalletMnemonic}
      />

      {mnemonic && <p>{mnemonic}</p>}

      <Footer />
    </>
  );
}

export default Wallet;
