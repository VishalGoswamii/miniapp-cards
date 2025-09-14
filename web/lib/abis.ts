export const CARD_ABI = [
{ "type":"function","name":"mintTo","stateMutability":"nonpayable","inputs":[{"name":"to","type":"address"},{"name":"id","type":"uint256"},{"name":"amount","type":"uint256"}],"outputs":[] },
{ "type":"function","name":"uri","stateMutability":"view","inputs":[{"name":"id","type":"uint256"}],"outputs":[{"type":"string"}] },
{ "type":"function","name":"balanceOf","stateMutability":"view","inputs":[{"name":"account","type":"address"},{"name":"id","type":"uint256"}],"outputs":[{"type":"uint256"}] }
] as const;


export const VENDING_ABI = [
{ "type":"function","name":"claimDaily","stateMutability":"nonpayable","inputs":[{"name":"fid","type":"uint256"}],"outputs":[{"type":"uint256","name":"requestId"}] },
{ "type":"function","name":"lastClaim","stateMutability":"view","inputs":[{"name":"fid","type":"uint256"}],"outputs":[{"type":"uint64"}] },
{ "type":"event","name":"ClaimFulfilled","inputs":[{"indexed":true,"name":"requestId","type":"uint256"},{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"cardId","type":"uint256"},{"indexed":false,"name":"rarityRoll","type":"uint256"}],"anonymous":false }
] as const;


export const ESCROW_ABI = [
{ "type":"function","name":"createOffer","inputs":[{"name":"token","type":"address"},{"name":"giving","type":"tuple[]","components":[{"name":"id","type":"uint256"},{"name":"amount","type":"uint256"}]},{"name":"wanting","type":"tuple[]","components":[{"name":"id","type":"uint256"},{"name":"amount","type":"uint256"}]},{"name":"taker","type":"address"}],"outputs":[{"type":"uint256"}],"stateMutability":"nonpayable" },
{ "type":"function","name":"acceptOffer","inputs":[{"name":"id","type":"uint256"}],"outputs":[],"stateMutability":"nonpayable" },
{ "type":"function","name":"cancelOffer","inputs":[{"name":"id","type":"uint256"}],"outputs":[],"stateMutability":"nonpayable" }
] as const;
