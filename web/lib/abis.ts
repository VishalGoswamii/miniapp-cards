// Minimal ABI for VendingMachine (TEST)
export const vendingAbi = [
  {
    "type": "function",
    "name": "claimDaily",
    "stateMutability": "nonpayable",
    "inputs": [{ "name": "fid", "type": "uint256" }],
    "outputs": [{ "name": "cardId", "type": "uint256" }]
  },
  {
    "type": "function",
    "name": "lastClaim",
    "stateMutability": "view",
    "inputs": [{ "name": "fid", "type": "uint256" }],
    "outputs": [{ "name": "", "type": "uint64" }]
  },
  {
    "type": "event",
    "name": "Claim",
    "inputs": [
      { "indexed": true, "name": "user", "type": "address" },
      { "indexed": true, "name": "fid", "type": "uint256" },
      { "indexed": false, "name": "cardId", "type": "uint256" },
      { "indexed": false, "name": "rarity", "type": "uint8" }
    ],
    "anonymous": false
  }
] as const;
