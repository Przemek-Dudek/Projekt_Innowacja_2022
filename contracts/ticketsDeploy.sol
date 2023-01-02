
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;
import "./Token.sol";

contract ticketsDeploy {

    struct Contracts {
        string explanation;
        address walletAddress;
        uint256 numberOfTokens;
    }

    //memory służy do zapewnienia miejsca na jakąś zmienną w pamięci 
    //(chunka odpowiedniej wielkoości)

    address public tokenAddress;
    uint256 currentBalance;
    address owner;

    constructor () { 
        owner = msg.sender;
    }

    Contracts[] private tickets;
    mapping (uint256 => address) public ticketsToOwner;
    

    event AddTicket(address recipent, uint ticketID);
    event TransferSent(address from, address to, uint amount);

    function addTicket(string calldata contractInfo, address wallet,uint256 numberOfTokens) public {
        uint ticketID = tickets.length;
        tickets.push(Contracts(contractInfo,wallet,numberOfTokens));
        ticketsToOwner[ticketID] = msg.sender;
        emit AddTicket(msg.sender, ticketID);
    }

    function sendToken(IERC20 token, address wallet, uint256 amount) public{
        require(msg.sender == owner, "Only owner can withdraw funds");
        uint256 balance = token.balanceOf(address(this));
        require(amount <= balance, "balance is low");
        token.transfer(wallet, amount);
        emit TransferSent(msg.sender, wallet, amount);
    }

    function setTokenAddress(address _address) public
    {
       tokenAddress = _address;
    }
    
    function giveTokenAddress() external returns(address)
    {
       return tokenAddress;
    }

    // function setOwner() external returns(address){
    //     owner = address(this);
    //     return owner;
    // }

    function getMyTickets() external view returns(Contracts[] memory)
    {
        Contracts[] memory temp = new Contracts[](tickets.length);
        uint tempCounter = 0;
        for(uint i=0; i<tickets.length; ++i)
        {
             if(ticketsToOwner[tempCounter] == msg.sender)
             {
                 temp[tempCounter] = tickets[i];
                 tempCounter++;
             }
        }

        Contracts[] memory result = new Contracts[](tempCounter);
        for(uint i=0; i<tempCounter; ++i)
        {
             result[i] = temp[i];
        }
        return result;
    }

    
}
