import useEth from "../../contexts/EthContext/useEth";
import Proposals from "./Proposals";
import Vote from "./Votes";
import { useState, useEffect } from "react";
import "../../styling/Indexes.css";

function VoterSection( {  status, number, updateNumber, setProposals, addresses }) {
  const { state: { contract, accounts } } = useEth();
  const [component, updateComponent] = useState();

  useEffect(() => {
    const onlyVoter = 
      <div className="voter">
        <h2 className="title">Voters Section</h2>
        <Proposals 
          status={status}
          setProposals={setProposals}
          number={number}
          updateNumber={updateNumber}
          contract={contract}
          accounts={accounts}/>
        <Vote status={status} number={number}/>
      </div>; 

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
      isVoter === true ? updateComponent(onlyVoter) : updateComponent(<></>);
    }

    if(contract) {
      loadProposals();
      loadOnlyVoters();
    }
  }, [contract, status, setProposals, accounts, addresses, number, updateNumber]);

  return (component);
}  
 export default VoterSection;
  