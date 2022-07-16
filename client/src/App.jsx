import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Header from "./components/Header";
import OwnerSection from "./components/OwnerSection";
import VoterSection from "./components/VoterSection";
import VoterAddresses from "./components/VoterAddresses";
import ProposalsList from "./components/ProposalsList";
import Status from "./components/Status";
import { useState } from "react";
import "./App.css";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [status, setStatus] = useState(0);
  const [proposals, setProposals] = useState([]);
  const [number, updateNumber] = useState();

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
          {number !== 0 ? <ProposalsList proposals={proposals}/> : null}
          <VoterSection 
            status={status}
            number={number} 
            updateNumber={updateNumber} 
            proposals={proposals} 
            setProposals={setProposals} 
            addresses={addresses}/>
          {addresses.length > 0 ? <VoterAddresses addresses={addresses}/> : null}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
