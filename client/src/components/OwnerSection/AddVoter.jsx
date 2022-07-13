import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function AddVoter({ setAddresses }) {
    const { state: { contract, accounts } } = useEth();
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const getEvents = async () => {
            try {
                if(contract) {
                    const addrArray = await contract.getPastEvents('VoterRegistered', {fromBlock: 0});
                    setAddresses(addrArray);
                }
            } catch (err) {
              console.error(err);
            }
        };
        getEvents();
    }, [contract, setAddresses]);

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