function Status({status}) {
  const getStatus = (status) => {
    switch(status){
      case "0":
        return "Registering Voters"
      case "1": 
        return "Proposals registration has started"
      case "2":
        return "Proposals registration has ended"
      case "3":
        return "Voting session has started"
      case "4":
        return "Voting session has ended"
      case "5":
        return "Votes Tallied"
      default:
        return "Registering Voters"
    }
  }
  
  return(
    <div>
      <p>Status of this session: <strong>{getStatus(status)}</strong></p>
    </div>
  )
}

export default Status;