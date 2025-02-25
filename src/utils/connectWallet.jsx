import {ethers,Contract} from "ethers";

import stakingAbi from "../ABI/stakingAbi.json";
import stakeTokenAbi from "../ABI/stakeTokenAbi.json"

export const connectWallet = async() =>{
    try{
        let[signer , provider , stakingContract , stakeTokenContract,chainId] =[null,null,null,null,null];
        if(window.ethereum === null){
            throw new Error("Metamask is not installed");
        }

        const accounts = await window.ethereum.request({
            method:'eth_requestAccounts'
        })

        let chainIdHex = await window.ethereum.request({
            method : 'eth_chainId'
        })
        chainId = parseInt(chainIdHex  ,16)

        let selectedAccount = accounts[0];
        if(!selectedAccount){
            throw new Error("No ethereum accounts available")
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        const stakingContractAddress = "0x92F6623e45C2B1Bc6dB530092cBB954EB2CC9e95";
        const stakeTokenContractAddress = "0x73f51F2f725E7A1FFA95a5c62E103172dfaf1dff";
        stakingContract = new Contract(stakingContractAddress , stakingAbi , signer);
        stakeTokenContract = new Contract(stakeTokenContractAddress , stakeTokenAbi , signer);
        return {provider , selectedAccount , stakeTokenContract , stakingContract, chainId}
    } catch(error){
        console.log(error);
        throw error
    }
}