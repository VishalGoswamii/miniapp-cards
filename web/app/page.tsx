"use client";

import { AuthKitProvider, SignInButton, useProfile } from "@farcaster/auth-kit";
import { baseSepolia } from "viem/chains";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { useMemo, useState } from "react";
import { vendingAbi } from "../../lib/abi"; // <--- Add an extra '../' here
import { env } from "../lib/env";

export default function Page() {
  return (
    <AuthKitProvider>
      <Home />
    </AuthKitProvider>
  );
}

function Home() {
  const { isAuthenticated, profile } = useProfile();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const pub = useMemo(
    () => createPublicClient({ chain: baseSepolia, transport: http() }),
    []
  );

  async function claim() {
    setErr(null);
    setTxHash(null);
    try {
      if (!window.ethereum) throw new Error("No wallet found");
      if (!isAuthenticated || !profile?.fid) throw new Error("Sign in with Farcaster first");

      const wallet = createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum)
      });
      const [account] = await wallet.getAddresses();

      const hash = await wallet.writeContract({
        address: env.VENDING_ADDRESS,
        abi: vendingAbi,
        functionName: "claimDaily",
        args: [BigInt(profile.fid)],
        account
      });

      setTxHash(hash);
      setLoading(true);

      await pub.waitForTransactionReceipt({ hash });
    } catch (e: any) {
      setErr(e?.shortMessage || e?.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Miniapp Cards — Base Sepolia</h1>
      <p style={{ opacity: 0.8, marginBottom: 16 }}>
        Chain: <code>{env.CHAIN_ID}</code> · Vending: <code>{env.VENDING_ADDRESS}</code>
      </p>

      {!isAuthenticated ? (
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
          <p>Sign in to get your free daily card:</p>
          <SignInButton />
        </div>
      ) : (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={claim}
            disabled={loading}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: "1px solid #ddd",
              background: loading ? "#eee" : "#111",
              color: loading ? "#999" : "#fff",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Claiming..." : "Vend a Card"}
          </button>
          <span style={{ opacity: 0.8 }}>
            Signed in as FID <b>{profile?.fid}</b>
          </span>
        </div>
      )}

      {txHash && (
        <p style={{ marginTop: 16 }}>
          Tx:{" "}
          <a href={`https://sepolia.basescan.org/tx/${txHash}`} target="_blank" rel="noreferrer">
            {txHash.slice(0, 10)}…
          </a>
        </p>
      )}

      {err && (
        <p style={{ marginTop: 12, color: "crimson" }}>
          {err}
        </p>
      )}
    </main>
  );
}
