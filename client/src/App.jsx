import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OwnerSection from "./components/OwnerSection";
import VoterSection from "./components/VoterSection";
import LogsSection from "./components/Logs";
import "./App.css";
import { useState } from "react";

function App() {
  const [addresses, setAddresses] = useState([]);

  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Header />
          <hr />
          <Intro />
          <hr />
          <OwnerSection setAddresses={setAddresses}/>
          <hr />
          <VoterSection />
          <hr />
          <LogsSection addresses={addresses}/>
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
