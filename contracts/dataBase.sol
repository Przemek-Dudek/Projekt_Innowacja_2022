// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract dataBase {
    enum accountType{ PRACOWNIK, HR, ADMIN,HEAD_ADMIN }
    address  private owner;
   struct info {
        string firstName;
        string lastName;
        string email;
        accountType accountType;
        bool activate;
    }
    mapping(address => info) private _dataBase;
    address[] private addressIndices;

    constructor(string memory name,string memory lastName,string memory email)
    {
        owner = msg.sender;
        _dataBase[owner].activate = true;
        _dataBase[owner].firstName = name;
        _dataBase[owner].lastName = lastName;
        _dataBase[owner].email = email;
        _dataBase[owner].accountType = accountType.HEAD_ADMIN;
        addressIndices.push(owner);
    }

    function addPerson(address user, string memory name, string memory lastName, string memory email, accountType  typeAccount) external returns(bool)
    {
        if(_dataBase[msg.sender].accountType == accountType.PRACOWNIK || getActivate(user))
            return false;
        _dataBase[user].activate = true;
        _dataBase[user].firstName = name;
        _dataBase[user].lastName = lastName;
        _dataBase[user].email = email;
        _dataBase[user].accountType = typeAccount;
        addressIndices.push(user);

        return true;
        
    }

    function length() external view returns(uint)
    {
        uint size = addressIndices.length;
        return size;
    }

    function doesHeExist(string memory email) public view returns(bool)
    {
        for(uint i = 0; i < addressIndices.length;i++)
        {
            if(keccak256(abi.encodePacked(email)) == keccak256(abi.encodePacked(_dataBase[addressIndices[i]].email)))
                return true;
        }
        return false;
    }

     function getAddressFromEmail(string memory email) public view returns(address)
    {
        for(uint i = 0; i < addressIndices.length;i++)
        {
            if(keccak256(abi.encodePacked(email)) == keccak256(abi.encodePacked(_dataBase[addressIndices[i]].email)))
                return addressIndices[i];
        }
        return msg.sender;
    }

    function getActivate(address wallet) public view returns (bool)
    {
        return _dataBase[wallet].activate;

    }


    function getString() public view returns(string memory) {
        return _dataBase[msg.sender].firstName;
    }


     function getType() external view returns (accountType)
    {
        return _dataBase[msg.sender].accountType;
    }

  
    
} 