import {useState , useEffect , useContext} from "react";
import Web3Context from "../../context/Web3Context";
import {ethers} from "ethers";

const StakedAmount = () => {
    const {stakingContract , selectedAccount} = useContext(Web3Context);
    const [stakedAmount , setStakedAmount] = useState("0");

    useEffect(() =>{
        const fetchStakedBalance = async() =>{
            try{
                const amountStakedWei  = await stakingContract.stakedBalance(selectedAccount);
                const amountStakedEth = ethers.formatUnits(amountStakedWei.toString(),18);
                setStakedAmount(amountStakedEth);
            } catch(error){
                console.log("Error fetching the data" , error.message)
            }
        }
        stakingContract && fetchStakedBalance();
    } , [stakingContract , selectedAccount])

    return(
        <p>Staked Amount :{stakedAmount} </p>
    )
}
export default StakedAmount;