"use client";
import { useEffect, useState } from "react";


export default function DailyClaimCard({ lastClaim, onClaim, txHash, fid }: { lastClaim: number | null; onClaim: () => Promise<void>; txHash: string | null; fid: number; }) {
const [cooldown, setCooldown] = useState<string>("");


useEffect(() => {
const t = setInterval(() => {
if (!lastClaim) { setCooldown("Ready"); return; }
const next = lastClaim * 1000 + 24 * 60 * 60 * 1000;
const left = Math.max(0, next - Date.now());
if (left === 0) setCooldown("Ready");
else {
const h = Math.floor(left / 3600000);
const m = Math.floor((left % 3600000) / 60000);
const s = Math.floor((left % 60000) / 1000);
setCooldown(`${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`);
}
}, 1000);
return () => clearInterval(t);
}, [lastClaim]);


return (
<div className="w-full max-w-md bg-white text-black rounded-2xl p-6 shadow-xl grid gap-4">
<h2 className="text-2xl font-bold">Your Daily Pull</h2>
<div className="text-sm opacity-70">FID: {fid}</div>
<div className="text-lg">Status: <span className={cooldown === "Ready" ? "text-green-600" : "text-orange-600"}>{cooldown || "..."}</span></div>
<button onClick={onClaim} disabled={cooldown !== "Ready"} className="disabled:opacity-50 disabled:cursor-not-allowed bg-black text-white rounded-xl px-4 py-3 hover:opacity-90">
Vend a Card
</button>
{txHash && (
<a className="text-blue-600 underline" href={`https://sepolia.basescan.org/tx/${txHash}`} target="_blank">View tx on BaseScan</a>
)}
<p className="text-sm opacity-70">After the VRF callback, your card will be minted directly to your wallet. Inventory & trading UIs are in progress below.</p>
</div>
);
}
