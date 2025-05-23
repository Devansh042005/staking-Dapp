import {  useContext } from "react";
import Web3Context from "../../context/Web3Context";
import Button from "../Button/Button";
import "./ClaimReward.css";
import {toast} from "react-hot-toast";

const ClaimReward = () => {
    const {stakingContract} = useContext(Web3Context);
    const claimReward = async() => {
        try{
            const transaction = await stakingContract.getReward();
            await toast.promise(transaction.wait(),{
                loading: "Transaction Pending",
                success: 'Transaction successful 👌',
                error: 'Transaction failed 🤯'
            })

            //if(receipt.status===1){
            //    setTransactionStatus("Transaction is successful");
            //    setTimeout(() => {
            //        setTransactionStatus("")
            //    } , 5000)
            //}
            //else{
            //    setTransactionStatus("Transaction failed");
            //}
        }catch(error){
            console.error("Withdraw failed" , error.message);
        }
    }
    return (
        <>
        <div className="claim-reward">
         <Button type="button" label="Claim Reward" onClick={claimReward}/>
         </div>
        </>
     )
}
export default ClaimReward;
