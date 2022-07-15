import { useState, useEffect } from "react";
import Status from "./Status";
import StatusChange from "./StatusChange";
import AddVoter from "./AddVoter";
import { useEth } from "../../contexts/EthContext";

function OwnerSection({ setAddresses }) {
  const { state: { contract, accounts } } = useEth();
  const [status, setStatus] = useState(0);
  const [component, updateComponent] = useState();

  useEffect(() => {
    const onlyOwner = 
    <>
      <StatusChange setStatus={setStatus}/>
      <br/>
      <AddVoter setAddresses={setAddresses}/>
    </>

    const notOwner = 
      <>
        <p>You are not an owner</p>
      </>

    const load = async() => {
      if(contract) {
        const owner = await contract.methods.owner().call();
        owner === accounts[0] ? updateComponent(onlyOwner) : updateComponent(notOwner);
      }
    }
    load();
    
  }, [contract, accounts, status, setAddresses]);

  return (
    <div className="owner">
      <h2 className="title">Administrator section</h2>
      <Status status={status} />
      {component}
    </div>
  );
}

export default OwnerSection;