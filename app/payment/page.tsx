"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x67a54D7D9B17127Bc91508839915A8285245cB16";

const CONTRACT_ABI = [
  "function payForAppointment(address doctor) external payable"
];

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const doctor = searchParams.get("doctor") || "";
  const specialty = searchParams.get("specialty") || "";
  const wallet = searchParams.get("wallet") || "";
  const patient = searchParams.get("patient") || "";
  const date = searchParams.get("date") || "";

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  async function handlePayment() {
    try {
      setLoading(true);
      setStatus("Connecting to wallet...");

      if (!(window as any).ethereum) {
        alert("Please install MetaMask");
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

      setStatus("Waiting for wallet confirmation...");

      const tx = await contract.payForAppointment(wallet, {
        value: ethers.parseEther("0.001"),
      });

      setTxHash(tx.hash);

      setStatus("Transaction submitted. Waiting for confirmation...");

      await tx.wait();

      setStatus("Payment successful!");
      setLoading(false);

    } catch (error: any) {
      console.log(error);
      setStatus(error?.reason || error?.message || "Payment failed");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">

      {/* Back Button */}

      <button
        onClick={() => router.back()}
        className="text-blue-600 mb-6"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6">
        Appointment Payment
      </h1>

      <div className="border p-6 rounded shadow">

        <p><strong>Doctor:</strong> {doctor}</p>
        <p><strong>Specialty:</strong> {specialty}</p>
        <p><strong>Patient:</strong> {patient}</p>
        <p><strong>Date:</strong> {date}</p>

        <p className="mt-4">
          <strong>Doctor Wallet:</strong> {wallet}
        </p>

        <p className="mt-4 font-semibold">
          Consultation Fee: 0.001 ETH
        </p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded mt-4 hover:bg-green-700"
        >
          {loading ? "Processing..." : "Pay with Wallet"}
        </button>

        {status && (
          <p className="mt-4 text-sm text-gray-600">
            {status}
          </p>
        )}

        {txHash && (
          <p className="mt-4 text-sm break-all">
            Transaction Hash: {txHash}
          </p>
        )}

        {/* Proceed Button */}

        {status === "Payment successful!" && (
          <div className="mt-6">
            <button
              onClick={() =>
                router.push(
                  `/doctor-record?patientWallet=${encodeURIComponent(wallet)}`
                )
              }
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Proceed to Medical Record
            </button>
          </div>
        )}

      </div>

    </div>
  );
}