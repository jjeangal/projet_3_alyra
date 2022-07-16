import { useState, useEffect } from "react";
import StatusChange from "./StatusChange";
import AddVoter from "./AddVoter";
import { useEth } from "../../contexts/EthContext";
import "../../styling/Indexes.css";

function OwnerSection({ setAddresses, status, setStatus }) {
  const { state: { contract, accounts } } = useEth();
  const [component, updateComponent] = useState();

  useEffect(() => {
    const onlyOwner = 
    <>
      <StatusChange status={status} setStatus={setStatus}/>
      <br/>
      <AddVoter setAddresses={setAddresses}/>
    </>

    const notOwner = 
      <>
        <br/>
        <p className="centered">You are not an owner</p>
      </>

    const load = async() => {
      if(contract) {
        const owner = await contract.methods.owner().call();
        owner === accounts[0] ? updateComponent(onlyOwner) : updateComponent(notOwner);
      }
    }
    load();
    
  }, [contract, accounts, status, setStatus, setAddresses]);

  return (
    <div className="owner">
      <h2 className="title">Administrator section</h2>
      {component}
    </div>
  );
}

export default OwnerSection;