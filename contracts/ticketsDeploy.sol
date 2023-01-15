
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;
import "./Token.sol";

contract ticketsDeploy {
    
    struct Ticket {
        string explanation;
        address walletAddress;
        uint256 numberOfTokens;
        bool approved;
        string explanationIfNot;
        uint256 id;
    }

    //memory służy do zapewnienia miejsca na jakąś zmienną w pamięci 
    //(chunka odpowiedniej wielkoości)

    address public tokenAddress;
    uint256 currentBalance;
    address owner;

    constructor () { 
        owner = msg.sender;
    }

    Ticket[] private tickets;
    mapping (uint256 => address) public ticketsToOwner;
    

    event AddTicket(address recipent, uint ticketID);
    event TransferSent(address from, address to, uint amount);
    event Received(address, uint);
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
    function addTicket(string calldata contractInfo, address wallet,uint256 numberOfTokens) external payable {
        uint256 ticketID = tickets.length;
        tickets.push(Ticket(contractInfo,wallet,numberOfTokens, false,"",ticketID));
        ticketsToOwner[ticketID] = msg.sender;
        emit AddTicket(msg.sender, ticketID);
    }

    function approve(uint ticketID,bool decision, string memory _explanation) external 
    {
         tickets[ticketID].approved = decision;
        if(decision)
        {
           // tu wywołamy send token jak już kiedyś będzie działać 
        }
        else {
            tickets[ticketID].explanationIfNot = _explanation;
        }
    }

    

    function sendToken(address wallet, uint256 amount) external payable{
        require(msg.sender == owner, "Only owner can withdraw funds");
        uint256 balance = Token(tokenAddress).balanceOf(address(this));
        require(amount <= balance, "balance is low");
        Token(tokenAddress).transfer(wallet, amount);
        //emit TransferSent(msg.sender, wallet, amount);
    }

    function setTokenAddress(address _address) public
    {
       tokenAddress = _address;
    }

    function giveTokenAddress() external view returns(address)
    {
        return tokenAddress;
    }


    function getMyTickets() external view returns(Ticket[] memory)
    {
        Ticket[] memory temp = new Ticket[](tickets.length);
        uint tempCounter = 0;
        for(uint i=0; i<tickets.length; ++i)
        {
             if(ticketsToOwner[tempCounter] == msg.sender)
             {
                 temp[tempCounter] = tickets[i];
                 tempCounter++;
             }
        }

        Ticket[] memory result = new Ticket[](tempCounter);
        for(uint i=0; i<tempCounter; ++i)
        {
             result[i] = temp[i];
        }
        return result;
    }

    
}
