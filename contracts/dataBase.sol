// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract Owner {
    enum accountType{ PRACOWNIK, HR, ADMIN,HEAD_ADMIN }
    address  private owner;
   struct info {
        string firstName;
        string lastName;
        string email;
        accountType accountType;
        bool activate;
    }
    mapping(address => info) private dataBase;
    address[] private addressIndices;

    constructor(string memory name,string memory lastName,string memory email)
    {
        owner = msg.sender;
        dataBase[owner].activate = true;
        dataBase[owner].firstName = name;
        dataBase[owner].lastName = lastName;
        dataBase[owner].email = email;
        dataBase[owner].accountType = accountType.HEAD_ADMIN;
        addressIndices.push(owner);
    }

    function addPerson(address  user,string memory name,string memory lastName,string memory email, accountType  typeAccount) public returns(bool)
    {
        if(dataBase[msg.sender].accountType == accountType.PRACOWNIK)
            return false;
        dataBase[user].activate = true;
        dataBase[user].firstName = name;
        dataBase[user].lastName = lastName;
        dataBase[user].email = email;
        dataBase[user].accountType = typeAccount;
        addressIndices.push(user);

        return true;
        
    }

    function doesHeExist(string memory email) public view returns(bool)
    {
        for(uint i = 0; i < addressIndices.length;i++)
        {
            if(keccak256(abi.encodePacked(email)) == keccak256(abi.encodePacked(dataBase[addressIndices[i]].email)))
                return true;
        }
        return false;
    }

     function getAddressFromEmail(string memory email) public view returns(address)
    {
        for(uint i = 0; i < addressIndices.length;i++)
        {
            if(keccak256(abi.encodePacked(email)) == keccak256(abi.encodePacked(dataBase[addressIndices[i]].email)))
                return addressIndices[i];
        }
        return msg.sender;
    }

    function getActivate() public view returns (bool)
    {
        return dataBase[msg.sender].activate;

    }

     function getType() public view returns (accountType)
    {
        return dataBase[msg.sender].accountType;

    }

  
    
} 