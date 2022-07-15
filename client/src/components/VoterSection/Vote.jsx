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
            handleVoterGetter(true);
        } else {
            alert("Not a valid address");
        }
    }

    return(
        <div class="voteInputs">
            <p>Vote for a proposal:</p>
            <input class="inputs" id="proposal" placeholder="proposal id"></input>
            <button class="buttonS" onClick={vote}>Vote</button>
            <br/>
            <p>Search for a voter:</p>
            <input class="inputs" id="address" placeholder="address"></input>
            <button class="buttonS" onClick={getVoter}>Get</button>
            {voterGetter === true? <p>Voter {voterAddress} voted for proposal {votedId} </p> : null}
        </div>
    )
}

export default Vote;