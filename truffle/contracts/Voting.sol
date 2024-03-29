// contracts/Voting.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Voting System
/// @author Jean Gal
contract Voting is Ownable {

    // Id of the winner proposal
    uint256 public winningProposalID;
    
    /// Voter struct object
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedProposalId;
    }

    /// Proposal struct object
    struct Proposal {
        string description;
        uint voteCount;
    }

    /// Enum for all status of the voting session
    enum WorkflowStatus {
        RegisteringVoters,              // 0
        ProposalsRegistrationStarted,   // 1
        ProposalsRegistrationEnded,     // 2
        VotingSessionStarted,           // 3
        VotingSessionEnded,             // 4
        VotesTallied                    // 5
    }

    // Current status of the session 
    WorkflowStatus public workflowStatus;
    /// Keep a list of proposals
    Proposal[] proposalsArray;
    /// Maps addresses of voters to Voter structs
    mapping (address => Voter) voters;


    /// Event to be triggered when the current status of the voting session changes
    event WorkflowStatusChange(WorkflowStatus _previousStatus, WorkflowStatus _newStatus);
    /// Event to be triggered when a voter gets registered    
    event VoterRegistered(address _voterAddress);
    /// Event to be triggered when a proposal gets registered 
    event ProposalRegistered(uint _proposalId, string _desc);
    /// Event to be triggered when a voter votes for a proposal
    event Voted(address _voter, uint _proposalId);

    /// @notice Address must be associated with existing voter
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    // ::::::::::::: GETTERS ::::::::::::: //

    /// @notice Return the voter's information
    /// @param _addr The address of the voter
    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }
    
    /// @notice Returns the proposal associated to the id
    /// @param _id The id of the proposal to be fetched
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

    // ::::::::::::: REGISTRATION ::::::::::::: // 

    /// @notice Add a voter to the session
    /// @dev Voter must not already be registered
    /// @param _addr The address of the voter to be added
    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus(0), 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');
    
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }
 
    // ::::::::::::: PROPOSAL ::::::::::::: // 

    /// @notice Add a proposal to the list of all proposals
    /// @dev Proposal can't have an empty description
    /// @param _desc The description of the proposal to be added
    function addProposal(string memory _desc) external onlyVoters {
        require(workflowStatus == WorkflowStatus(1), 'Proposals are not allowed yet');
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'Vous ne pouvez pas ne rien proposer'); // facultatif
        require(proposalsArray.length < 8970, "Adding another proposal will make further loop reach block gas limit");

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length-1, _desc);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /// @notice Allows a voter to vote for a proposal at the appropriate state
    /// @dev Voter must exist and be registered
    /// @param _id The id of the proposal to be voted for
    function setVote(uint256 _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found'); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //

    
    /// @notice Call to start the proposal registering phase of the active voting session
    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus(0), 'Registering proposals cant be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }
    
    /// @notice Call to end the proposal registering phase of the active voting session
    function endProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus(1), 'Registering proposals havent started yet');
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }
    
    /// @notice Call to allow voters to vote for a proposal
    function startVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus(2), 'Registering proposals phase is not finished');
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    /// @notice Call when voters should not be able to vote anymore
    function endVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus(3), 'Voting session havent started yet');
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }

    /// @notice Start the vote tally phase of the voting session and set the winner
    /// @dev Create a copy in memory of the proposals array for gas optimization
   function tallyVotes() external onlyOwner {
        require(workflowStatus == WorkflowStatus(4), "Current status is not voting session ended");
        uint256 _winningProposalId;
        for (uint256 p = 0; p < proposalsArray.length && p < 8982; p++) {
            if (proposalsArray[p].voteCount > proposalsArray[_winningProposalId].voteCount) {
                _winningProposalId = p;
            }
        }
        winningProposalID = _winningProposalId;
       
        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }
}
