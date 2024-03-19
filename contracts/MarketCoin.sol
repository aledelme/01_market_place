// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Token ERC20 MarketCoin (CMP)
 * @author Alejandro Del Medico
 * @notice Token ERC20 para realizar intercambios de compra y venta en la plataforma Crypto Market Place
 * Deployment date: 2024-03-19 20:36
 */
contract MarketCoin is ERC20 {

    mapping(address => bool) private _minted;

    constructor() ERC20("Market Coin", "CMP") {}

    function airDrop() public {
        require(!_minted[msg.sender], "Token already minted for this address");
        _minted[msg.sender] = true;
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function hasMinted() public view returns (bool) {
        return _minted[msg.sender];
    }
}