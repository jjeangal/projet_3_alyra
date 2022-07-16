import { useEffect, useCallback } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "../../styling/Buttons.css";

function StatusChange({ setWinner, handleShowWinner, status, setStatus }) {
    const { state: { accounts, contract } } = useEth();

    const updateStatus = useCallback(async() => {
        const currentStatus = await contract.methods.workflowStatus().call();
        setStatus(currentStatus);
    }, [contract, setStatus]);

    const loadWinner = useCallback(async() => {
        contract.getPastEvents('ProposalRegistered', {fromBlock: 0, toBlock: 'latest'}).then(
            results => factorWinner(results));
        
        const factorWinner = async(results) => {
            if(results.length > 0) {
                const winnerId = await contract.methods.winningProposalID().call();
                setWinner(winnerId);
                handleShowWinner(true);
            }
        }
    }, [contract, setWinner, handleShowWinner]);

    useEffect(() => {
        const checkWinner = async() => {
            if(parseInt(status) === 5) {
                loadWinner();
            }
        }
        checkWinner();
    }, [contract, status, loadWinner]);
    
    const startProp = async() => {
        await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
        updateStatus();
    }

    const endProp = async() => {
        await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
        updateStatus();
    }

    const startVoting = async() => {
        await contract.methods.startVotingSession().send({ from: accounts[0] });
        updateStatus();
    }

    const endVoting = async() => {
        await contract.methods.endVotingSession().send({ from: accounts[0] });
        updateStatus();
    }

    const tallyVotes = async() => {
        await contract.methods.tallyVotes().send({ from: accounts[0] });
        updateStatus();
        loadWinner();
    }

    return(
        <div className="statusButtons">
            {parseInt(status) === 0 ? <button className="buttonS" onClick={startProp}>Start proposal phase</button> : null}
            {parseInt(status) === 1 ? <button className="buttonS" onClick={endProp}>End proposal phase</button> : null}
            {parseInt(status) === 2 ? <button className="buttonS" onClick={startVoting}>Start voting phase</button> : null}
            {parseInt(status) === 3 ? <button className="buttonS" onClick={endVoting}>End voting phase</button> : null}
            {parseInt(status) === 4 ? <button className="buttonS" onClick={tallyVotes}>Tally Votes</button> : null}
            {parseInt(status) === 5 ? <p>Voting session  is over.</p> : null}
        </div>
    )
}

export default StatusChange;