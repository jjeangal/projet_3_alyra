import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Vote() {
    const { state: { contract, accounts } } = useEth();
    const [proposaId, updateProposalId] = useState();
    const [voterAddress, updateVoterAddress] = useState("");
    const [votedId, updateVotedId] = useState();

    const vote = async() => {
        if (/^(0|[1-9][0-9]*)$/.test(proposaId)) {
            await contract.methods.setVote(proposaId).send({ from: accounts[0] });
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

    const handleChange = e => {
        updateProposalId(e);
    }

    return(
        <div>
            <input placeholder="set id of proposal" onChange={handleChange}></input>
            <button onClick={vote}>Vote</button>
            <br />
            <input id="address" placeholder="search voter from address"></input>
            <button onClick={getVoter}>Get Voter</button>
            <p>Voter {voterAddress} voted for proposal {votedId} </p>
        </div>
    )
}

export default Vote;