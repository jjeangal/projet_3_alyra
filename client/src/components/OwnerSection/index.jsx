import { useState, useEffect } from "react";
import StatusChange from "./StatusChange";
import AddVoter from "./AddVoter";
import { useEth } from "../../contexts/EthContext";
import "../../styling/Indexes.css";

function OwnerSection({ setAddresses, status, setStatus }) {
  const { state: { contract, accounts } } = useEth();
  const [component, updateComponent] = useState();
  const [winner, setWinner] = useState();
  const [showWinner, handleShowWinner] = useState(false);

  useEffect(() => {
    const onlyOwner = 
    <>
      <h2 className="title">Administrator section</h2>
      <br/>
      <StatusChange 
        status={status} 
        setStatus={setStatus} 
        setWinner={setWinner} 
        handleShowWinner={handleShowWinner}/>
      <AddVoter status={status} setAddresses={setAddresses}/>
    </>

    const load = async() => {
      if(contract) {
        const owner = await contract.methods.owner().call();
        const addrArray = await contract.getPastEvents('VoterRegistered', {fromBlock: 0});
        const currentStatus = await contract.methods.workflowStatus().call();
        setStatus(currentStatus);
        setAddresses(addrArray);
        owner === accounts[0] ? updateComponent(onlyOwner) : updateComponent(<></>);
      }
    }
    load();
    
  }, [contract, accounts, status, setStatus, setAddresses]);

  const winnerComponent =
    <>
      <p>The winner of this voting session is proposal {winner}</p>
    </>

  return (
    <>
      {showWinner === true ? winnerComponent : null}
      <div>
        {component}
      </div>
    </>
  );
}

export default OwnerSection;