"use client";

import Navbar from "@/components/Navbar";
import WalletConnect from "@/components/WalletConnect";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x3330249B3489cF0A962c83a1B09d56A034094E9a";

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

  async function handlePayment() {
    try {
      setLoading(true);

      if (!(window as any).ethereum) {
        alert("MetaMask not installed");
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);

      await provider.send("eth_requestAccounts", []);

      const network = await provider.getNetwork();

      if (Number(network.chainId) !== 11155111) {
        alert("Please switch MetaMask to Sepolia network");
        return;
      }

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.payForAppointment(wallet, {
        value: ethers.parseEther("0.001"),
      });

      setTxHash(tx.hash);

      await tx.wait();

      alert("Payment successful!");

    } catch (error: any) {
      console.log(error);
      alert(error.message || "Payment failed");
    }

    setLoading(false);
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

        <WalletConnect />

        <div className="bg-white p-6 rounded shadow mt-6 max-w-xl">

          <p><strong>Doctor:</strong> {doctor}</p>
          <p><strong>Specialty:</strong> {specialty}</p>
          <p><strong>Patient:</strong> {patient}</p>
          <p><strong>Date:</strong> {date}</p>

          <p className="text-sm text-gray-500 mt-2 break-all">
            Doctor Wallet: {wallet}
          </p>

          <div className="mt-6">
            <p className="font-semibold">Consultation Fee</p>
            <p>0.001 ETH</p>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            {loading ? "Processing..." : "Pay with Wallet"}
          </button>

          {txHash && (
            <div className="mt-6">
              <p className="font-semibold">Transaction Hash</p>
              <p className="text-sm break-all">{txHash}</p>

              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                className="text-blue-600"
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