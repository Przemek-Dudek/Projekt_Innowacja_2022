// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


// This is the main building block for smart contracts.
contract Token is ERC20Capped, ERC20Burnable{
    // Some string type variables to identify the token.
    uint256 public maxSupply = 1000000;
    address  public owner;

    constructor(address contractAddress) ERC20("Transition Technologies", "$TTPSC") ERC20Capped(maxSupply * (10 ** decimals())) {
        owner = msg.sender;
        _mint(contractAddress, maxSupply * (10 ** decimals()));
    }

    function _mint(address account, uint256 amount) internal virtual override(ERC20Capped, ERC20) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

}