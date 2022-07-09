import useEth from "../../contexts/EthContext/useEth";

function StatusChange({ setValue }) {
    const { state: { contract, accounts } } = useEth();

    const updateStatus = async() => {
        const value = await contract.methods.workflowStatus().call({ from: accounts[0] });
        setValue(value);
        console.log(value);
    };
    
    const startProp = async() => {
        try {
            await contract.methods.startProposalsRegistering().call({ from: accounts[0] });
            updateStatus();
        } catch (error) {
            if(error.message.includes("Registering proposals cant be started now")) {
                alert("Registering proposals cant be started now");
            }
        }
    }

    const endProp = async() => {
        try {
            await contract.methods.endProposalsRegistering().call({ from: accounts[0] });
            updateStatus();
        } catch (error) {
            if(error.message.includes("Registering proposals havent started yet")) {
                alert("Registering proposals havent started yet");
            }
        }
    }

    const startVoting = async() => {
        try {
            await contract.methods.startVotingSession().call({ from: accounts[0] });
            updateStatus();
        } catch (error) {
            if(error.message.includes("Registering proposals phase is not finished")) {
                alert("Registering proposals phase is not finished");
            }
        }
    }

    const endVoting = async() => {
        try {
            await contract.methods.endVotingSession().call({ from: accounts[0] });
            updateStatus();
        } catch (error) {
            if(error.message.includes("Voting session havent started yet")) {
                alert("Voting session havent started yet");
            }
        }
    }

    const tallyVotes = async() => {
        try {
            await contract.methods.tallyVotes().call({ from: accounts[0] });
            updateStatus();
        } catch (error) {
            if(error.message.includes("Current status is not voting session ended")) {
                alert("Current status is not voting session ended");
            }
        }
    }

    return(
        <div className="statusChanges">
            <button className={"stateButton"} onClick={startProp}>Start proposal phase</button>
            <button className={"stateButton"} onClick={endProp}>End proposal phase</button>
            <button className={"stateButton"} onClick={startVoting}>Start voting phase</button>
            <button className={"stateButton"} onClick={endVoting}>End voting phase</button>
            <button className={"stateButton"} onClick={tallyVotes}>tally Votes</button>
        </div>
    )
}

export default StatusChange;