import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Header from "./components/Header";
import OwnerSection from "./components/OwnerSection";
import VoterSection from "./components/VoterSection";
import LogsSection from "./components/Logs";
import { useState } from "react";
import "./App.css";

function App() {
  const [addresses, setAddresses] = useState([]);

  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Header />
          <hr />
          <Intro />
          <hr/>
          <OwnerSection setAddresses={setAddresses}/>
          <hr />
          <VoterSection addresses={addresses}/>
          <hr />
          <LogsSection addresses={addresses}/>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
