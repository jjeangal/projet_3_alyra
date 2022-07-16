import "../styling/Logs.css";

function VoterAddresses({addresses}) {
  const logs = 
    <div>
      <hr/>
      <table>
        <tbody>
          <tr><th>Voters Addresses</th></tr>
          {addresses.map((address) => 
            (<tr key={address.id}><td>{address.returnValues._voterAddress}</td></tr>))}
        </tbody>
      </table>
    </div>
  
  return (
    <div>
      {logs}
      <br/>
    </div>
  );
}
  
export default VoterAddresses;