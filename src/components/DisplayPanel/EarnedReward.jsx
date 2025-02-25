import { useState , useEffect , useContext } from "react";
import Web3Context from "../../context/Web3Context";
import {ethers} from 'ethers';

const EarnedReward  = () => {
    const {stakingContract , selectedAccount} = useContext(Web3Context);
    const [rewardVal , setRewardVal] = useState("0");

    useEffect(() =>{
        const fetchStakeRewardInfo = async() => {
            try{
                // fetching the amount staked by the user
                const rewardValueWei = await stakingContract.earned(selectedAccount);
                const rewardValueEth = ethers.formatUnits(rewardValueWei , 18).toString();
                const roundedReward = parseFloat(rewardValueEth).toFixed(2);
                setRewardVal(roundedReward);
            } catch(error){
                console.log("Error fetching the data", error.message);
            }
        }
        stakingContract && fetchStakeRewardInfo();
    } , [stakingContract , selectedAccount]);

    return(
        <p>Earned Reward: {rewardVal}</p>
    )
}
export default EarnedReward;