import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Proposals() {
  const { state: { contract, accounts } } = useEth();
  const [proposals, setProposals] = useState([]);
  const [description, setDescription] = useState("");
  const [voteCount, setVoteCount] = useState(0);
  const [number, updateNumber] = useState(0);
  const [id, setId] = useState("");

  useEffect(() => {
    const first = async() => {
      if(contract) {
        const transaction = await contract.getPastEvents('ProposalRegistered', {fromBlock: 0});
        const numberOfTransactions = transaction.length;
        updateNumber(numberOfTransactions);
        setProposals(transaction);
      }
    }
    first();
  }, [contract, accounts]);

  const addProposal = async() => {
    if(description !== "") {
      const transac = await contract.methods.addProposal(description).send({ from: accounts[0] });
      const eventData = transac.events.ProposalRegistered.returnValues._proposalId;
      updateNumber(parseInt(eventData));
      setProposals(proposals => [...proposals, transac.events.ProposalRegistered]);
    } else {
      alert('Proposal description cannot be empty');
    }
  } 

  const getProposal = async() => {
    if (/^(0|[1-9][0-9]*)$/.test(id)) { // Also check if Id exists ( < nb of proposals)
      const proposal = await contract.methods.getOneProposal(id).call({ from: accounts[0] });
      setVoteCount(proposal.voteCount);
      // Do something with proposal -> show vote count 
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
      <p>IDs start at 0 and latest proposal id is {number > 0? number-1: "None"}</p>
      <input placeholder="add proposal description" onChange={handleAddProposal}></input>
      <button onClick={addProposal}>press</button>
      <br />
      <input placeholder="get proposal by id" onChange={handleGetProposal}></input>
      <button onClick={getProposal}>press</button>
      <p>This proposal got {voteCount} votes</p>
      <table>
        <tbody>
          {proposals.map((proposal) => 
            (<tr key={proposal.id}><td>{proposal.returnValues._proposalId}</td><td>{proposal.returnValues._desc}</td></tr>))}
        </tbody>
      </table>
    </div>
  )
}

export default Proposals;