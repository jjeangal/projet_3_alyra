import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";

function AddVoter() {
    const { state: { contract, accounts } } = useEth();
    const [inputValue, setInputValue] = useState("");

    const addVoter = async() => {
        try {
            await contract.methods.addVoter(inputValue).send({ from: accounts[0] });
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

    return (
        <div className="input-btn">
            Add following adress: (<input
                type="text"
                placeholder="address"
                value={inputValue}
                onChange={handleInputChange}
             />)
            <button onClick={addVoter}>+</button>
        </div>
    )
}

export default AddVoter;