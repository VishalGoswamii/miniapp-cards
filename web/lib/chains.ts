import { base, baseSepolia } from "viem/chains";


export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 8453); // default to Base mainnet
export const CHAIN = CHAIN_ID === base.id ? base : (CHAIN_ID === baseSepolia.id ? baseSepolia : base);
```ts
import { base, baseSepolia } from "viem/chains";


export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 84532);
export const CHAIN = CHAIN_ID === base.id ? base : baseSepolia;
