// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;


contract MarketPlace {
    struct Company {
        string name;
        address company;
    }
    struct Product {
        string name;
        address company;
        uint256 price;
    }
    struct Invoice {
        address company;
        address client;
        Product[] products;
    }

    mapping (address => string) public Companies;
    mapping (address => Product[]) public CompanyProducts;
    Product[] public Products;

    function registerCompany (string memory _name) public {
        Companies[msg.sender] = _name;
    }

    function registerProduct (string memory _name, uint256 _price) public {
        Product memory newProduct = Product(_name, msg.sender, _price);
        CompanyProducts[msg.sender].push(newProduct);
        Products.push(newProduct);
    }
}