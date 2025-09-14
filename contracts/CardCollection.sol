// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.0.2/contracts/token/ERC1155/ERC1155.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v5.0.2/contracts/access/Ownable.sol";

contract CardCollection is ERC1155, Ownable {
    string public name = "Miniapp Cards";
    string public symbol = "MAC";
    address public minter;

    constructor(string memory baseURI, address initialOwner)
        ERC1155(baseURI)
        Ownable(initialOwner)
    {}

    function setBaseURI(string memory newURI) external onlyOwner {
        _setURI(newURI);
    }

    function setMinter(address m) external onlyOwner {
        minter = m;
    }

    function mintTo(address to, uint256 id, uint256 amount) external {
        require(msg.sender == minter, "not minter");
        _mint(to, id, amount, "");
    }
}
