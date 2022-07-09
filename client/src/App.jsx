import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Footer from "./components/Footer";
import OwnerSection from "./components/OwnerSection";
import VoterSection from "./components/VoterSection";
import LogsSection from "./components/Logs";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Intro />
          <hr />
          <OwnerSection />
          <hr />
          <VoterSection />
          <hr />
          <Setup />
          <hr />
          <LogsSection />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
