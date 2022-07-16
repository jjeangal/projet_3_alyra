import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Header from "./components/Header";
import OwnerSection from "./components/OwnerSection";
import VoterSection from "./components/VoterSection";
import LogsSection from "./components/Logs";
import Status from "./components/OwnerSection/Status";
import { useState } from "react";
import "./App.css";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [status, setStatus] = useState(0);

  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Header />
          <hr />
          <Intro />
          <hr/>
          <Status status={status}/>
          <OwnerSection status={status} setAddresses={setAddresses} setStatus={setStatus}/>
          <hr />
          <VoterSection addresses={addresses}/>
          {addresses.length > 0 ? <LogsSection addresses={addresses}/> : null}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
