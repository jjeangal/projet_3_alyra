import { useState } from "react";
import Status from "./Status";
import StatusChange from "./StatusChange";

function OwnerSection() {
  const [value, setValue] = useState(0);

  const owner = 
    <>
      <Status value={value} />
      <StatusChange setValue={setValue}/>
    </>;
  
  return (
    <div className="owner">
      <h1 className="title"></h1>
      {owner}
    </div>
  );
}

export default OwnerSection;