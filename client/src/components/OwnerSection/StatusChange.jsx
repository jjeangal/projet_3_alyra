import { useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "../../styling/Buttons.css";

function StatusChange({ setStatus }) {
    const { state: { accounts, contract } } = useEth();

    useEffect(() => {
        const loadStatus = async() => {
            const status = await contract.methods.workflowStatus().call();
            setStatus(status);
        }
        loadStatus();
    }, [contract, setStatus]);

    const updateStatus = async() => {
        const status = await contract.methods.workflowStatus().call();
        setStatus(status);
    };
    
    const startProp = async() => {
        try {
            await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
            updateStatus();
        } catch (error) {
            if(error.message.includes("Registering proposals cant be started now")) {
                alert("Registering proposals cant be started now");
            }
        }
    }

    const endProp = async() => {
        try {
            await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
            updateStatus();
        } catch (error) {
            if(error.message.includes("Registering proposals havent started yet")) {
                alert("Registering proposals havent started yet");
            }
        }
    }

    const startVoting = async() => {
        try {
            await contract.methods.startVotingSession().send({ from: accounts[0] });
            updateStatus();
        } catch (error) {
            if(error.message.includes("Registering proposals phase is not finished")) {
                alert("Registering proposals phase is not finished");
            }
        }
    }

    const endVoting = async() => {
        try {
            await contract.methods.endVotingSession().send({ from: accounts[0] });
            updateStatus();
        } catch (error) {
            if(error.message.includes("Voting session havent started yet")) {
                alert("Voting session havent started yet");
            }
        }
    }

    const tallyVotes = async() => {
        try {
            await contract.methods.tallyVotes().send({ from: accounts[0] });
            updateStatus();
        } catch (error) {
            if(error.message.includes("Current status is not voting session ended")) {
                alert("Current status is not voting session ended");
            }
        }
    }

    return(
        <div class="statusButtons">
            <button class="buttonS" onClick={startProp}>Start proposal phase</button>
            <button class="buttonS" onClick={endProp}>End proposal phase</button>
            <button class="buttonS" onClick={startVoting}>Start voting phase</button>
            <button class="buttonS" onClick={endVoting}>End voting phase</button>
            <button class="buttonS" onClick={tallyVotes}>Tally Votes</button>
        </div>
    )
}

export default StatusChange;