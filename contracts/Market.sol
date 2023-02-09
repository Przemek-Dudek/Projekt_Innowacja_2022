pragma solidity ^0.8.9;


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
    

    function addProductt(string memory _name, uint256 _cost,string memory _url) external  returns(bool) {
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
        for(uint256 i = 0; i < products.length;i++)
        {
            if(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(products[i].name)))    
            {
                 delete products[i];
                 break;
            }
        }
         
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
