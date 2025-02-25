import {  useContext , useRef, useState } from "react";
import {ethers} from 'ethers';
import Web3Context from "../../context/Web3Context";
import Button from "../Button/Button";
const StakeAmount = () => {
    const { stakingContract }  =useContext(Web3Context);
    const stakeAmountRef = useRef();

    const [transactionStatus, setTransactionStatus] = useState("");
    const stakeToken = async(e) => { // e = event
        e.preventDefault(); // auto submit na ho jay form
        const amount = stakeAmountRef.current.value.trim();
        if(isNaN(amount) || amount <=0){
            console.error("please enter a valid positive number");
            return;
        }
        const amountToStake = ethers.parseUnits(amount,18).toString();
        try{
            const transaction = await stakingContract.stake(amountToStake); 
            // stakingContract.target gives the contract address of stake token contract
            setTransactionStatus("Transaction is in pending ....");
            const receipt = await transaction.wait();
            if(receipt.status ===1){
                setTransactionStatus("Transaction is Successful");
                setTimeout(() =>{
                    setTransactionStatus("")
                }, 5000)
               stakeAmountRef.current.value = ""
            }
            else{
                setTransactionStatus("Transaction Failed");
            }
        } catch(error){
            console.error("Staking Failed" , error.message);
        }
    }

    return(
        <div>
        {transactionStatus && <div>{transactionStatus}</div>}  
            <form onSubmit={stakeToken}>
                <label>Amount to stake:</label>
                <input type="text" ref = {stakeAmountRef}></input>
                <Button onClick={stakeToken}  type= "submit" label = "Stake"></Button>
            </form>
        </div>
    )
}
export default StakeAmount;
