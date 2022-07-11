import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Proposals() {
  const { state: { contract, accounts } } = useEth();
  const [number, updateNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  const addProposal = async() => {
    if(description !== "") {
      const transac = await contract.methods.addProposal(description).send({ from: accounts[0] });
      const eventData = transac.events.ProposalRegistered.returnValues._proposalId;
      updateNumber(eventData);
    } else {
      alert('Proposal description cannot be empty');
    }
  } 

  const getProposal = async() => {
    if (/^(0|[1-9][0-9]*)$/.test(id)) { // Also check if Id exists ( < nb of proposals)
      const proposal = await contract.methods.getOneProposal(id).send({ from: accounts[0] });
      console.log(proposal[0]);
      // Do something with proposal (how to show it)
    } else {
      alert('Proposal must be a positive number');
    }
  }

  const handleAddProposal = e => {
    setDescription(e.target.value);
  };

  const handleGetProposal = e => {
    setId(e.target.value);
  }

  return(
    <div>
      <p>There are currently {number} proposals and their ids go from 0 to {number}</p>
      <input placeholder="add proposal description" onChange={handleAddProposal}></input>
      <button onClick={addProposal}>press</button>
      <br />
      <input placeholder="get proposal by id" onChange={handleGetProposal}></input>
      <button onClick={getProposal}>press</button>
    </div>
  )
}

export default Proposals;