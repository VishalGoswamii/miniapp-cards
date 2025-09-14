export const env = {
  CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID || "84532",
  VENDING_ADDRESS: (process.env.NEXT_PUBLIC_VENDING_MACHINE || "").toLowerCase() as `0x${string}`,
  CARD_COLLECTION: (process.env.NEXT_PUBLIC_CARD_COLLECTION || "").toLowerCase() as `0x${string}`,
  TRADING_ESCROW: (process.env.NEXT_PUBLIC_TRADING_ESCROW || "").toLowerCase() as `0x${string}`,
};
