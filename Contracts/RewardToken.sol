// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20{
    constructor(uint256 initalSupply) ERC20("RewardToken" , "RWK"){
        _mint(msg.sender, initalSupply*10**18);
    }
    
}