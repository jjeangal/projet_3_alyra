import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import "../../styling/Buttons.css";

function AddVoter({ status, setAddresses }) {
    const { state: { contract, accounts } } = useEth();
    const [inputValue, setInputValue] = useState("");

    const addVoter = async() => {
        try {
            const transac = await contract.methods.addVoter(inputValue).send({ from: accounts[0] });
            setAddresses(addresses => [...addresses, transac.events.VoterRegistered]);
            setInputValue("");
        } catch (error) {
            if (inputValue === "") {
                alert("choose a valid address");
            }
        }
    }

    const handleInputChange = e => {
        if (/0[xX][0-9a-fA-F]+/.test(e.target.value)) {
          setInputValue(e.target.value);
        }
    };

    const addVoterComponent =
        <div>
            Add following adress: <input
                className="inputs"
                type="text"
                placeholder="address"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button className="buttonS" onClick={addVoter}>Add</button>
        </div>

    return (parseInt(status) === 0 ? addVoterComponent : null);
}

export default AddVoter;