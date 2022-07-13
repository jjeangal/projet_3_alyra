import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Vote() {
    const { state: { contract, accounts } } = useEth();
    const [voterAddress, updateVoterAddress] = useState("");
    const [votedId, updateVotedId] = useState();

    const vote = async() => {
        const proposal = document.getElementById("proposal").value;
        const allProposals = await contract.getPastEvents('ProposalRegistered', {fromBlock: 0});

        if (/^(0|[1-9][0-9]*)$/.test(proposal)) {
            if(proposal <= allProposals.length - 1) {
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
        } else {
            alert("Not a valid address");
        }
    }

    return(
        <div>
            <input id="proposal" placeholder="set id of proposal"></input>
            <button onClick={vote}>Vote</button>
            <br />
            <input id="address" placeholder="search voter from address"></input>
            <button onClick={getVoter}>Get Voter</button>
            <p>Voter {voterAddress} voted for proposal {votedId} </p>
        </div>
    )
}

export default Vote;