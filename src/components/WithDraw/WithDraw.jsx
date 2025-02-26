import { useState , useRef , useContext } from "react";
import {ethers} from 'ethers';
import Web3Context from "../../context/Web3Context";
import Button from "../Button/Button";

const WithdrawStakeAmount = () => {
    const {stakingContract} = useContext(Web3Context);
    const WithdrawStakeAmountRef = useRef();

    const [transactionStatus , setTransactionStatus] = useState("");
    const withDrawStakeToken = async(e) => {
        e.preventDefault();
        const amount = WithdrawStakeAmountRef.current.value.trim();
        if(isNaN(amount) || amount <= 0){
            console.log("please enter a valid positive Number");
            return;
        }
        const amountToWithdraw = ethers.parseUnits(amount,18).toString();
        try{
            const transaction = await stakingContract.withdrawStakedTokens(amountToWithdraw);
            setTransactionStatus("WithDraw is in pending state");
            const receipt = await transaction.wait();
            if(receipt.status===1){
                setTransactionStatus("Withdrawl is successful");
                setTimeout(() => {
                    setTransactionStatus("")
                } , 5000)
                WithdrawStakeAmountRef.current.value = ""
            }
            else{
                setTransactionStatus("Withdrawl failed");
            }
        }catch(error){
            console.error("Withdraw failed" , error.message);
        }
    }
    return(
        <div>
        {transactionStatus && <div>{transactionStatus}</div>}
        <form onSubmit={withDrawStakeToken}>
                <label>Amount to Withdraw:</label>
                <input type="text" ref = {WithdrawStakeAmountRef}></input>
                <Button onClick={withDrawStakeToken}  type= "submit" label = "Withdraw Stake Token"></Button>
        </form>
    </div>
    )
}
export default WithdrawStakeAmount;