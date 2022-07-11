import useEth from "../contexts/EthContext/useEth";

function Header() {
    const { state: { accounts } } = useEth();

    return(
        <div className='header'>Your active address is: {accounts} </div>
    )
}

export default Header;