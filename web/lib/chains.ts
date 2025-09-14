import { base, baseSepolia } from "viem/chains";


// Use env to choose network; default to Base mainnet (8453)
export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 8453);
export const CHAIN = CHAIN_ID === base.id ? base : baseSepolia;


export const EXPLORER_TX = (hash: string) =>
CHAIN_ID === base.id
? `https://basescan.org/tx/${hash}`
: `https://sepolia.basescan.org/tx/${hash}`;
```ts
import { base, baseSepolia } from "viem/chains";


export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 84532);
export const CHAIN = CHAIN_ID === base.id ? base : baseSepolia;
