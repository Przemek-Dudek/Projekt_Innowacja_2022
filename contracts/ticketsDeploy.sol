
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

    Contracts[] private tickets;
    mapping (uint256 => address) public ticketsToOwner;

    event AddTicket(address recipent, uint ticketID);

    function addTicket(string calldata contractInfo, address wallet,uint256 numberOfTokens) public {
        uint ticketID = tickets.length;
        tickets.push(Contracts(contractInfo,wallet,numberOfTokens));
        ticketsToOwner[ticketID] = msg.sender;
        emit AddTicket(msg.sender, ticketID);
    }

    function setTokenAddress(address _address) public
    {
       tokenAddress = _address; 
    }


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

    function sendToken(address wallet, uint256 amount) public returns(bool){
        return Token(tokenAddress).transfer(wallet,amount);
    }

    function giveBalance() public returns(uint256){
        return 2;
    }//Token(tokenAddress).balanceOf(msg.sender)


}
