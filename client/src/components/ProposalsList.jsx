function proposalsList( { proposals }) {
    const proposalsTable = 
      <div>
        <h4>List of current proposals</h4>
        <table>
          <tbody>
            <tr><th>Id</th><th>Description</th></tr>
            {proposals.map((proposal) => 
              (<tr key={proposal.id}><td>{proposal.returnValues._proposalId}</td><td>{proposal.returnValues._desc}</td></tr>))}
          </tbody>
        </table>
        <br/>
      </div> 

    return (
      <div>
        {proposalsTable}
      </div>
    );
}

export default proposalsList;