import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Vote() {
    const { state: { contract, accounts } } = useEth();
    const [proposaId, updateProposalId] = useState();
    const [voterAddress, updateVoterAddress] = useState("");

    const vote = async() => {
        await contract.methods.setVote(proposaId).send({ from: accounts[0] });
    }

    const getVoter = async() => {
        const transac = await contract.methods.getVoter(voterAddress).send({ from: accounts[0] });
        console.log(transac); // show voter info
    }

    const handleChange = e => {
        if (/^(0|[1-9][0-9]*)$/.test(e.target.value)) {
            updateProposalId(e);
        }
    }

    const handleVoterChange = e => {
        if (/0[xX][0-9a-fA-F]+/.test(e.target.value)) {
          updateVoterAddress(e.target.value);
        }
    };

    return(
        <div>
            <input placeholder="set id of proposal" onChange={handleChange}></input>
            <button onClick={vote}>Vote</button>
            <br />
            <input placeholder="search voter from address" onChange={handleVoterChange}></input>
            <button onClick={getVoter}>Get Voter</button>
        </div>
    )
}

export default Vote;