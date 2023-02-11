// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;


contract Market {
    
    struct Product
    {
        string name;
        uint256 cost;
        string url;
    }
    address owner;

    constructor () { 
        owner = msg.sender;
    }

    Product[] private products;
    

    function addProduct(string memory _name, uint256 _cost,string memory _url) external  returns(bool) {
        if(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(""))) {
            revert("Name cannot be empty");
        }

        if(keccak256(abi.encodePacked(_url)) == keccak256(abi.encodePacked(""))) {
            revert("URL cannot be empty");
        }

        for(uint256 i = 0; i < products.length;i++)
        {
            if(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(products[i].name)))
                return false;
        }
    
        products.push(Product(_name,_cost,_url));
        return true;
    }

    function deleteProduct(string memory _name) external 
    {
        require(products.length > 0);

        for(uint256 i = 0; i < products.length; i++)
        {
            if(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(products[i].name)))    
            {
                 delete products[i];
                 return;
            }
        }
        
        revert("No such product exists");
    }

    function editProduct(string memory _name, uint256 _cost) external  returns(bool)
    {
         for(uint256 i = 0; i < products.length;i++)
        {
            if(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(products[i].name)))
                {
                    products[i].cost = _cost;
                    return true;
                }
        }
    
        return false;
    }

    function getProducts() external view returns(Product[] memory)
    {
        //ten require sprawdza czy więcej niż 0 produktów, do wywalenia jeśli się coś w związku z tym sypie
        require(products.length > 0);

        Product[] memory temp = new Product[](products.length);
        uint tempCounter = 0;
        for(uint i=0; i<products.length; ++i)
        {
             if(keccak256(abi.encodePacked("")) != keccak256(abi.encodePacked(products[i].name)))
             {
                 temp[tempCounter] = products[i];
                 tempCounter++;
             }
        }

        Product[] memory result = new Product[](tempCounter);
        for(uint i=0; i<tempCounter; ++i)
        {
             result[i] = temp[i];
        }
        return result;
    }

    
    
}
