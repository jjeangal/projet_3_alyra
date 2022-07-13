import useEth from "../../contexts/EthContext/useEth";
import Proposals from "./Proposals";
import Vote from "./Vote";
import { useState, useEffect } from "react";

function VoterSection( { addresses }) {
  const { state: { contract, accounts } } = useEth();
  const [proposals, setProposals] = useState([]);
  const [number, updateNumber] = useState(0);
  const [component, updateComponent] = useState();

  useEffect(() => {
    const onlyVoter = 
      <>
        <Proposals 
          setProposals={setProposals} 
          updateNumber={updateNumber}
          number={number}
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
  
  const showProposals =
    <>
      <p>IDs start at 0 and latest proposal id is {number > 0? number-1: "None"}</p>
      <table>
        <tbody>
          {proposals.map((proposal) => 
            (<tr key={proposal.id}><td>{proposal.returnValues._proposalId}</td><td>{proposal.returnValues._desc}</td></tr>))}
        </tbody>
      </table>
    </>

  return (
    <div className="voter">
      <h1 className="title">Voters Section</h1>
      {showProposals}
      <br/>
      {component}
    </div>
  );
}  
 export default VoterSection;
  