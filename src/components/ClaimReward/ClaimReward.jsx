import { useState, useContext } from "react";
import Web3Context from "../../context/Web3Context";
import Button from "../Button/Button";

const ClaimReward = () => {
    const {stakingContract} = useContext(Web3Context);
    const [transactionStatus , setTransactionStatus] = useState("");
    const claimReward = async() => {
        try{
            const transaction = await stakingContract.getReward();
            setTransactionStatus("Transaction is in pending state");
            const receipt = await transaction.wait();
            if(receipt.status===1){
                setTransactionStatus("Transaction is successful");
                setTimeout(() => {
                    setTransactionStatus("")
                } , 5000)
            }
            else{
                setTransactionStatus("Transaction failed");
            }
        }catch(error){
            console.error("Withdraw failed" , error.message);
        }
    }
    return(
        <>
        {transactionStatus && <div>{transactionStatus}</div>}
        <Button type = "button" label="Claim Reward" onClick={claimReward} />
        </>
    )
}
export default ClaimReward;
