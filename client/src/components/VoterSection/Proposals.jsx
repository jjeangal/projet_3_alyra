import { useState } from "react";

// props: number, updateNumber, setProposals, contract, accounts
function Proposals(props) {
  const [description, setDescription] = useState("");
  const [voteCount, setVoteCount] = useState(0);
  const [id, setId] = useState("");

  const addProposal = async() => {
    if(description !== "") {
      const transac = await props.contract.methods.addProposal(description).send({ from: props.accounts[0] });
      const eventData = transac.events.ProposalRegistered.returnValues._proposalId;
      props.updateNumber(parseInt(eventData));
      props.setProposals(proposals => [...proposals, transac.events.ProposalRegistered]);
    } else {
      alert('Proposal description cannot be empty');
    }
  } 

  const getProposal = async() => {
    if (/^(0|[1-9][0-9]*)$/.test(id)) {
      if(id < props.number) {
        const proposal = await props.contract.methods.getOneProposal(id).call({ from: props.accounts[0] });
        setVoteCount(proposal.voteCount);
        console.log("do something");
        // Do something with proposal -> show vote count 
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

  const handleGetProposal = e => {
    setId(e.target.value);
  }

  return(
    <div>
      <input placeholder="add proposal description" onChange={handleAddProposal}></input>
      <button onClick={addProposal}>press</button>
      <br />
      <input placeholder="get proposal by id" onChange={handleGetProposal}></input>
      <button onClick={getProposal}>press</button>
      <p>This proposal got {voteCount} votes</p>

    </div>
  )
}

export default Proposals;