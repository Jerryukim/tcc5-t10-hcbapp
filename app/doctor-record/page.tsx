"use client";

import Navbar from "@/components/Navbar";
import WalletConnect from "@/components/WalletConnect";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x67a54D7D9B17127Bc91508839915A8285245cB16";

const CONTRACT_ABI = [
  "function recordMedicalHash(address patient, string memory recordHash) external",
];

export default function DoctorRecordPage() {
  const router = useRouter();

  const [patientWallet, setPatientWallet] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");
  const [recordHash, setRecordHash] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);

  function generateHash() {
    if (!patientWallet || !diagnosis) {
      alert("Patient wallet and diagnosis are required.");
      return;
    }

    const raw = `${patientWallet}|${diagnosis}|${prescription}|${notes}`;
    const hash = ethers.keccak256(ethers.toUtf8Bytes(raw));
    setRecordHash(hash);
  }

  async function handleStoreOnChain() {
    try {
      if (!recordHash) {
        alert("Generate the medical record hash first.");
        return;
      }

      if (!(window as any).ethereum) {
        alert("MetaMask not installed.");
        return;
      }

      setLoading(true);

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);

      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 11155111) {
        alert("Please switch MetaMask to Sepolia network.");
        return;
      }

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.recordMedicalHash(patientWallet, recordHash);
      setTxHash(tx.hash);

      await tx.wait();

      alert("Medical record hash stored on-chain successfully!");
    } catch (error: any) {
      console.error(error);
      alert(error?.reason || error?.message || "Transaction failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="p-6">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      <main className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Doctor Medical Record
        </h1>

        <div className="mb-6">
          <WalletConnect />
        </div>

        <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
          <label className="block mb-2 font-semibold">
            Patient Wallet Address
          </label>
          <input
            type="text"
            className="w-full border p-2 mb-4"
            value={patientWallet}
            onChange={(e) => setPatientWallet(e.target.value)}
            placeholder="0x..."
          />

          <label className="block mb-2 font-semibold">
            Diagnosis
          </label>
          <textarea
            className="w-full border p-2 mb-4"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis"
          />

          <label className="block mb-2 font-semibold">
            Prescription
          </label>
          <textarea
            className="w-full border p-2 mb-4"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            placeholder="Enter prescription"
          />

          <label className="block mb-2 font-semibold">
            Notes
          </label>
          <textarea
            className="w-full border p-2 mb-4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional notes"
          />

          <button
            onClick={generateHash}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 mr-3"
          >
            Generate Record Hash
          </button>

          <button
            onClick={handleStoreOnChain}
            disabled={loading}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Storing..." : "Store Hash On-Chain"}
          </button>

          {recordHash && (
            <div className="mt-6 p-4 bg-gray-50 rounded border">
              <p className="font-semibold mb-2">Generated Record Hash</p>
              <p className="text-sm break-all text-gray-700">{recordHash}</p>
            </div>
          )}

          {txHash && (
            <div className="mt-6 p-4 bg-gray-50 rounded border">
              <p className="font-semibold mb-2">Transaction Hash</p>
              <p className="text-sm break-all text-gray-700">{txHash}</p>

              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on Sepolia Etherscan
              </a>
            </div>
          )}
        </div>
      </main>
    </>
  );
}