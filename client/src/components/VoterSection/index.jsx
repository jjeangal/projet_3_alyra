import useEth from "../../contexts/EthContext/useEth";
import Proposals from "./Proposals";
import Vote from "./Vote";
import { useState, useEffect } from "react";
import "../../styling/Indexes.css";

function VoterSection( { addresses }) {
  const { state: { contract, accounts } } = useEth();
  const [number, updateNumber] = useState();
  const [proposals, setProposals] = useState([]);
  const [component, updateComponent] = useState();

  useEffect(() => {
    const onlyVoter = 
      <>
        <Proposals 
          setProposals={setProposals}
          number={number}
          updateNumber={updateNumber}
          contract={contract}
          accounts={accounts}/>
        <br />
        <Vote number={number}/>
      </>; 

    const loadProposals = async() => {
      try {
        const transaction = await contract.getPastEvents('ProposalRegistered', {fromBlock: 0});
        const numberOfTransactions = transaction.length;
        updateNumber(numberOfTransactions);
        setProposals(transaction);
      } catch (err) {
        console.error(err);
      }
    }

    function loadOnlyVoters() {
      let isVoter = false;
      addresses.forEach(voter => {
        if(voter.returnValues._voterAddress === accounts[0]) isVoter = true;
      });
      isVoter === true ? updateComponent(onlyVoter) : updateComponent(<>You are not a voter</>);
    }

    if(contract) {
      loadProposals();
      loadOnlyVoters();
    }
  }, [contract, accounts, addresses, number]);

  const ifProposals = 
    <>
      <br/>
      <h4>List of current proposals</h4>
      <table>
        <tbody>
          <tr><th>Id</th><th>Description</th></tr>
          {proposals.map((proposal) => 
            (<tr key={proposal.id}><td>{proposal.returnValues._proposalId}</td><td>{proposal.returnValues._desc}</td></tr>))}
        </tbody>
      </table>
    </> 

  return (
    <div className="voter">
      <h2 className="title">Voters Section</h2>
      {number !== 0 ? ifProposals : null}
      <br/>
      {component}
    </div>
  );
}  
 export default VoterSection;
  