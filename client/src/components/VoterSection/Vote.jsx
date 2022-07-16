import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "../../styling/Buttons.css";

function Vote( {number} ) {
    const { state: { contract, accounts } } = useEth();
    const [voterAddress, updateVoterAddress] = useState("");
    const [votedId, updateVotedId] = useState();
    const [voterGetter, handleVoterGetter] = useState(false);

    const vote = async() => {
        const proposal = document.getElementById("proposal").value;
        if (/^(0|[1-9][0-9]*)$/.test(proposal)) {
            if(proposal < number) {
                await contract.methods.setVote(proposal).send({ from: accounts[0] });
            } else {
                alert("Proposal associated to this id does not exist");
            }
        } else {
            alert("Proposal Id must be a positive interger");
        }
    }
        
    const getVoter = async() => {
        const addr = document.getElementById("address").value;
        if (/0[xX][0-9a-fA-F]+/.test(addr)) {
            const transac = await contract.methods.getVoter(addr).call({ from: accounts[0] });
            updateVotedId(transac.votedProposalId);
            updateVoterAddress(addr);
            let state = 3;
            if(transac.isRegistered) {
                state = 2;
                if(transac.hasVoted) {
                    state = 1;
                }
            } 
            handleVoterGetter(state);
        } else {
            alert("Not a valid address");
        }
    }

    function ShowVoter(props) {
        const state = props.state;
        if(state === 1) {
            return <><br/><p>Voter <strong>{voterAddress}</strong> voted for proposal {votedId} </p></>;
        } if (state === 2) {
          return <><br/><p>Voter <strong>{voterAddress}</strong> has not yet voted.</p></>;
        } if(state === 3) {
            return  <><br/><p> <strong>{voterAddress}</strong> is not a voter.</p></>;
        } else {
            return null;
        }
      }

    return(
        <div className="voteInputs">
            <p>Vote for a proposal:</p>
            <input className="inputs" id="proposal" placeholder="proposal id"></input>
            <button className="buttonS" onClick={vote}>Vote</button>
            <br/>
            <p>Search for a voter:</p>
            <input className="inputs" id="address" placeholder="address"></input>
            <button className="buttonS" onClick={getVoter}>Get</button>
            <ShowVoter state={voterGetter}></ShowVoter>
        </div>
    )
}

export default Vote;