// scripts/deploy.ts
import { ethers } from "hardhat";
import * as dotenv from "dotenv"; dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // 1) CardCollection
  const Card = await ethers.getContractFactory("CardCollection");
  const card = await Card.deploy("ipfs://YOUR_CID/", await deployer.getAddress());
  await card.waitForDeployment();
  console.log("CardCollection:", await card.getAddress());

  // 2) VendingMachine (uses .env)
  const COORD = process.env.VRF_COORDINATOR!;
  const SUBID = BigInt(process.env.VRF_SUBSCRIPTION_ID!);
  const KEYHASH = process.env.VRF_KEYHASH! as `0x${string}`;

  const Vend = await ethers.getContractFactory("VendingMachine");
  const vend = await Vend.deploy(
    await card.getAddress(),
    COORD,
    SUBID,
    KEYHASH,
    await deployer.getAddress()
  );
  await vend.waitForDeployment();
  console.log("VendingMachine:", await vend.getAddress());

  // 3) Allow vending machine to mint
  const tx = await card.setMinter(await vend.getAddress());
  await tx.wait();

  // 4) TradingEscrow
  const Escrow = await ethers.getContractFactory("TradingEscrow");
  const escrow = await Escrow.deploy();
  await escrow.waitForDeployment();
  console.log("TradingEscrow:", await escrow.getAddress());

  console.log("\nAdd these to web/.env.local:");
  console.log("NEXT_PUBLIC_CARD_COLLECTION=", await card.getAddress());
  console.log("NEXT_PUBLIC_VENDING_MACHINE=", await vend.getAddress());
  console.log("NEXT_PUBLIC_TRADING_ESCROW=", await escrow.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });
