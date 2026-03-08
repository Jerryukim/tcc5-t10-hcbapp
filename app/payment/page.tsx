"use client";

import Navbar from "@/components/Navbar";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x67a54D7D9B17127Bc91508839915A8285245cB16";

const CONTRACT_ABI = [
  "function payForAppointment(address doctor) external payable",
];

export default function PaymentPage() {
  const router = useRouter();
  const params = useSearchParams();

  const doctor = params.get("doctor") || "";
  const wallet = params.get("wallet") || "";
  const specialty = params.get("specialty") || "";
  const patient = params.get("patient") || "";
  const date = params.get("date") || "";

  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handlePayment() {
    try {
      setLoading(true);
      setStatus("Checking MetaMask...");

      const ethereum = (window as any).ethereum;

      if (!ethereum) {
        alert("MetaMask is not installed.");
        setLoading(false);
        setStatus("");
        return;
      }

      if (!wallet || !ethers.isAddress(wallet)) {
        alert("Doctor wallet address is invalid.");
        setLoading(false);
        setStatus("");
        return;
      }

      const chainId = await ethereum.request({ method: "eth_chainId" });

      if (chainId !== "0xaa36a7") {
        setStatus("Switching to Sepolia...");
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }],
          });
        } catch (switchError: any) {
          alert("Please switch MetaMask to Sepolia manually.");
          setLoading(false);
          setStatus("");
          return;
        }
      }

      setStatus("Requesting account access...");
      await ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      setStatus("Waiting for MetaMask confirmation...");

      const tx = await contract.payForAppointment(wallet, {
        value: ethers.parseEther("0.001"),
      });

      setTxHash(tx.hash);
      setStatus("Transaction submitted. Waiting for confirmation...");
      setLoading(false);

      await tx.wait();

      setStatus("Payment successful!");
      alert("Payment successful!");
    } catch (error: any) {
      console.error(error);

      if (error?.code === 4001) {
        alert("Transaction rejected in MetaMask.");
      } else {
        alert(error?.reason || error?.message || "Payment failed.");
      }

      setLoading(false);
      setStatus("");
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
        <h1 className="text-3xl font-bold mb-6">Appointment Payment</h1>

        <div className="bg-white p-6 rounded shadow mt-6 max-w-xl">
          <p>
            <strong>Doctor:</strong> {doctor}
          </p>
          <p>
            <strong>Specialty:</strong> {specialty}
          </p>
          <p>
            <strong>Patient:</strong> {patient}
          </p>
          <p>
            <strong>Date:</strong> {date}
          </p>

          <p className="text-sm text-gray-500 mt-2 break-all">
            <strong>Doctor Wallet:</strong> {wallet}
          </p>

          <p className="text-sm text-gray-500 mt-2 break-all">
            <strong>Contract Address:</strong> {CONTRACT_ADDRESS}
          </p>

          <div className="mt-6">
            <p className="font-semibold">Consultation Fee</p>
            <p>0.001 ETH</p>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Processing..." : "Pay with Wallet"}
          </button>

          {status && (
            <p className="mt-4 text-blue-600 text-sm">{status}</p>
          )}

          {txHash && (
            <div className="mt-6">
              <p className="font-semibold">Transaction Hash:</p>
              <p className="text-sm break-all">{txHash}</p>

              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View on Etherscan
              </a>
            </div>
          )}
        </div>
      </main>
    </>
  );
}