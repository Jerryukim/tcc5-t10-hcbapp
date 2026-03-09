"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x67a54D7D9B17127Bc91508839915A8285245cB16";

const CONTRACT_ABI = [
  "function recordMedicalHash(address patient, string memory recordHash) external",
];

export default function DoctorRecordPage() {
  const router = useRouter();

  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [patientWallet, setPatientWallet] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");

  const [recordHash, setRecordHash] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function saveToBackend() {
    try {
      setStatus("Saving record to backend...");

      const res = await fetch("/api/medical-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
          doctorId,
          diagnosis,
          prescription,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to save record");
      }

      setRecordHash(data.recordHash);

      setStatus("Medical record saved successfully.");

      return data.recordHash;

    } catch (error: any) {
      console.error(error);
      setStatus(error?.message || "Failed to save record");
      return null;
    }
  }

  async function handleSaveAndStore() {
    try {

      if (!patientId || !doctorId || !patientWallet || !diagnosis) {
        alert("Patient ID, Doctor ID, Wallet, and Diagnosis are required.");
        return;
      }

      if (!ethers.isAddress(patientWallet)) {
        alert("Invalid patient wallet address.");
        return;
      }

      setLoading(true);

      const hash = await saveToBackend();

      if (!hash) {
        setLoading(false);
        return;
      }

      if (!(window as any).ethereum) {
        alert("MetaMask not installed");
        setLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);

      await provider.send("eth_requestAccounts", []);

      const network = await provider.getNetwork();

      if (Number(network.chainId) !== 11155111) {
        alert("Please switch MetaMask to Sepolia network");
        setLoading(false);
        return;
      }

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      setStatus("Storing hash on blockchain...");

      const tx = await contract.recordMedicalHash(patientWallet, hash);

      setTxHash(tx.hash);

      await tx.wait();

      setStatus("Medical record stored on-chain successfully!");

    } catch (error: any) {
      console.error(error);
      alert(error?.reason || error?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-8">

      <button
        onClick={() => router.back()}
        className="text-blue-600 mb-6 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">
        Doctor Portal: Medical Record Entry
      </h1>

      <p className="text-gray-600 mb-6">
        Doctors can enter diagnosis and store the medical record hash on-chain.
      </p>

      <div className="border p-6 rounded shadow bg-white">

        <label className="block mb-2 font-semibold">
          Patient ID
        </label>

        <input
          className="w-full border p-2 mb-4"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Patient ID"
        />

        <label className="block mb-2 font-semibold">
          Doctor ID
        </label>

        <input
          className="w-full border p-2 mb-4"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          placeholder="Doctor ID"
        />

        <label className="block mb-2 font-semibold">
          Patient Wallet Address
        </label>

        <input
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
          placeholder="Diagnosis"
        />

        <label className="block mb-2 font-semibold">
          Prescription
        </label>

        <textarea
          className="w-full border p-2 mb-4"
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          placeholder="Prescription"
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
          onClick={handleSaveAndStore}
          disabled={loading}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Processing..." : "Save Record and Store Hash On-Chain"}
        </button>

        {status && (
          <p className="mt-4 text-gray-600 text-sm">{status}</p>
        )}

        {recordHash && (
          <div className="mt-6">
            <p className="font-semibold">Record Hash</p>
            <p className="text-sm break-all">{recordHash}</p>
          </div>
        )}

        {txHash && (
          <div className="mt-6">
            <p className="font-semibold">Transaction Hash</p>
            <p className="text-sm break-all">{txHash}</p>

            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              className="text-blue-600 underline"
            >
              View on Etherscan
            </a>
          </div>
        )}

      </div>

    </main>
  );
}