import { useEffect, useState , useContext } from "react";
import Web3Context from "../../context/Web3Context";
import {ethers} from 'ethers';

const RewardRate = () =>{

    const{stakingContract , selectedAccount} = useContext(Web3Context);
    const[rewardRate , setRewardRate] = useState("0");

    useEffect(() => {
        const fetchRewardRate = async() => {
            try{
                const rewardRatedWei  = await stakingContract.REWARD_RATE();
                const rewardRateEth = ethers.formatUnits(rewardRatedWei.toString(),18);
                setRewardRate(rewardRateEth);
            } catch (error){
                console.log("Error fetching the Reward Rate" , error.message)
            }
        }
        stakingContract && fetchRewardRate();
    } , [stakingContract , selectedAccount])

    return(
        <p>Reward Rate: {rewardRate} token/seconed</p>
    )
}
export default RewardRate;