import {  useContext , useRef, useState } from "react";
import {ethers} from 'ethers';
import Web3Context from "../../context/Web3Context";
import Button from "../Button/Button";

const TokenApproval = () =>{
const {stakeTokenContract , stakingContract }  =useContext(Web3Context);
    const approvedTokensRef = useRef();
    const [transactionStatus, setTransactionStatus] = useState("");
    const approveTokens = async(e) => { // e = event
        e.preventDefault(); // auto submit na ho jay form
        const amount = approvedTokensRef.current.value.trim();
        if(isNaN(amount) || amount <=0){
            console.error("please enter a valid positive number");
            return;
        }
        const amountToSend = ethers.parseUnits(amount,18).toString();
        try{
            const transaction = await stakeTokenContract.approve(stakingContract.target , amountToSend); 
            // stakingContract.target gives the contract address of stake token contract
            setTransactionStatus("Transaction is in pending ....");
            const receipt = await transaction.wait();
            if(receipt.status ===1){
                setTransactionStatus("Transaction is Successful");
                setTimeout(() =>{
                    setTransactionStatus("")
                }, 5000)
               approvedTokensRef.current.value = ""
            }
            else{
                setTransactionStatus("Transaction Failed");
            }
        } catch(error){
            console.error("Token Approval Failed" , error.message);
        }
    }

    return(
        <div>
        {transactionStatus && <div>{transactionStatus}</div>}  
            <form onSubmit={approveTokens}>
                <label>Token Approval:</label>
                <input type="text" ref = {approvedTokensRef}></input>
                <Button onClick={approveTokens}  type= "submit" label = "Tokens Approve"></Button>
            </form>
        </div>
    )
}
export default TokenApproval;
