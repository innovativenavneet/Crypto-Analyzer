import React from "react";
import Header from "../components/Common/Header";
import Maincomponent from "../components/LandingPage/MainComponent";
import Footer from "../components/Common/Footer"
function Home() {
  return (
    <div className="home-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div className="main-content" style={{ flexGrow: 1 }}>
        <Maincomponent />
      </div>
      <Footer />
    </div>
  );
}


export default Home;
