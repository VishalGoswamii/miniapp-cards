// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";


/// @title CardCollection
/// @notice ERC-1155 where tokenId encodes season|set|rarity|index.
contract CardCollection is ERC1155, Ownable {
using Strings for uint256;


string public name = "MiniApp Cards";
string public symbol = "MAC";


string private _baseURI; // e.g. ipfs://CID/
address public minter; // VendingMachine contract


error NotMinter();


constructor(string memory baseURI_, address initialOwner) ERC1155("") Ownable(initialOwner) {
_baseURI = baseURI_;
}


function setBaseURI(string calldata newBase) external onlyOwner {
_baseURI = newBase;
}


function setMinter(address _minter) external onlyOwner {
minter = _minter;
}


function uri(uint256 id) public view override returns (string memory) {
return string(abi.encodePacked(_baseURI, id.toString(), ".json"));
}


function mintTo(address to, uint256 id, uint256 amount) external {
if (msg.sender != minter) revert NotMinter();
_mint(to, id, amount, "");
}
}
