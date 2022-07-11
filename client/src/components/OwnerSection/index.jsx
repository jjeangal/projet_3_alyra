import { useState } from "react";
import Status from "./Status";
import StatusChange from "./StatusChange";
import AddVoter from "./AddVoter";

function OwnerSection({ setAddresses }) {
  const [value, setValue] = useState(0);

  const owner = 
    <>
      <Status value={value} />
      <StatusChange setValue={setValue}/>
      <AddVoter setAddresses={setAddresses}/>
    </>;
  
  return (
    <div className="owner">
      <h1 className="title">Only Owner</h1>
      {owner}
    </div>
  );
}

export default OwnerSection;