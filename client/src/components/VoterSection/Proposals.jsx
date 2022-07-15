import { useState } from "react";
import "../../styling/Buttons.css";

function Proposals( { number, updateNumber, setProposals, contract, accounts } ) {
  const [description, setDescription] = useState("");
  const [voteCount, setVoteCount] = useState(0);
  const [proposalGetter, handleProposalGetter] = useState(false);
  const [id, setId] = useState("");

  const addProposal = async() => {
    if(description !== "") {
      const transac = await contract.methods.addProposal(description).send({ from: accounts[0] });
      const eventData = transac.events.ProposalRegistered.returnValues._proposalId + 1;
      setProposals(proposals => [...proposals, transac.events.ProposalRegistered]);
      updateNumber(parseInt(eventData));
    } else {
      alert('Proposal description cannot be empty');
    }
  } 

  const getProposal = async() => {

    const proposalId = document.getElementById("id").value;
    if (/^(0|[1-9][0-9]*)$/.test(proposalId)) {
      if(proposalId < number) {
        const proposal = await contract.methods.getOneProposal(proposalId).call({ from: accounts[0] });
        setVoteCount(proposal.voteCount);
        setId(proposalId);
        handleProposalGetter(true);
      } else {
        alert("Proposal associated to this id does not exist");
      }
    } else {
      alert('Proposal must be a positive number');
    }
  }

  const handleAddProposal = e => {
    setDescription(e.target.value);
  };

  return(
    <div class="voteInputs">
      <p>Add a new proposal:</p>
      <input class="inputs" placeholder="description" onChange={handleAddProposal}></input>
      <button class="buttonS" onClick={addProposal}>Add</button>
      <br />
      <p>Search for a proposal:</p>
      <input class="inputs" id="id" placeholder="proposal id"></input>
      <button class="buttonS" onClick={getProposal}>Get</button>
      {proposalGetter === true ? <p>Proposal {id} got {voteCount} votes</p> : null}
    </div>
  )
}

export default Proposals;