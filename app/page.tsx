"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ethers } from "ethers";

export default function HomePage() {
  const router = useRouter();

  const [wallet, setWallet] = useState("");
  const [connecting, setConnecting] = useState(false);

  async function connectWallet() {
    try {
      if (!(window as any).ethereum) {
        alert("Please install MetaMask");
        return;
      }

      setConnecting(true);

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      setWallet(accounts[0]);
      setConnecting(false);
    } catch (err) {
      console.log(err);
      setConnecting(false);
    }
  }

  function enterPatient() {
    localStorage.setItem("userRole", "patient");
    router.push("/patient-dashboard");
  }

  function enterDoctor() {
    localStorage.setItem("userRole", "doctor");
    router.push("/doctor-login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-10 text-center w-[500px]">
        <h1 className="text-3xl font-bold mb-4">
          Web3 Healthcare Booking App
        </h1>

        <p className="mb-6 text-gray-600">
          Connect your wallet and choose your role
        </p>

        <button
          onClick={connectWallet}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          {connecting
            ? "Connecting..."
            : wallet
            ? "Wallet Connected"
            : "Connect Wallet"}
        </button>

        {wallet && (
          <p className="mt-3 text-sm text-gray-500 break-all">
            {wallet}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={enterPatient}
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Continue as Patient
          </button>

          <button
            onClick={enterDoctor}
            className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Continue as Doctor
          </button>
        </div>
      </div>
    </main>
  );
}