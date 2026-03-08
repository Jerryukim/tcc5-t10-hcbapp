"use client";

import Navbar from "@/components/Navbar";
import WalletConnect from "@/components/WalletConnect";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const doctor = searchParams.get("doctor") || "No doctor selected";
  const specialty = searchParams.get("specialty") || "No specialty selected";
  const wallet = searchParams.get("wallet") || "No wallet selected";
  const patient = searchParams.get("patient") || "No patient name";
  const date = searchParams.get("date") || "No appointment date";

  const [txHash, setTxHash] = useState("");

  function handlePayment() {
    const fakeHash =
      "0x" + Math.random().toString(16).slice(2).padEnd(64, "0");

    setTxHash(fakeHash);

    alert("Payment simulated successfully!");
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
          Appointment Payment
        </h1>

        <div className="mb-6">
          <WalletConnect />
        </div>

        <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
          <div className="mb-6 space-y-2">
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
              <strong>Appointment Date:</strong> {date}
            </p>

            <p className="text-sm text-gray-500 break-all">
              <strong>Doctor Wallet:</strong> {wallet}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
            <p className="font-semibold text-blue-900">
              Consultation Fee
            </p>

            <p className="text-blue-700">0.001 ETH</p>
          </div>

          <button
            onClick={handlePayment}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            Pay with Wallet
          </button>

          {txHash && (
            <div className="mt-6 p-4 bg-gray-50 rounded border">
              <p className="font-semibold mb-2">Transaction Hash</p>

              <p className="text-sm text-gray-600 break-all">
                {txHash}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}