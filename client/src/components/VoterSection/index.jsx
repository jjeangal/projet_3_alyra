import Proposals from "./Proposals";
import Vote from "./Vote";

function VoterSection() {
  const voters = 
    <>
      <Proposals/>
      <br />
      <br />
      <Vote/>
    </>; 
  
  return (
    <div className="voter">
      <h1 className="title">Voters Section</h1>
      {voters}
    </div>
  );
}  
 export default VoterSection;
  