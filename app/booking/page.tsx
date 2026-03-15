"use client";

import Navbar from "@/components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const doctor = searchParams.get("doctor") || "No doctor selected";
  const doctorId = searchParams.get("doctorId") || "";
  const specialty = searchParams.get("specialty") || "No specialty selected";
  const wallet = searchParams.get("wallet") || "No wallet selected";

  const [name, setName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");

  function handleBooking() {
    if (!name || !patientId || !date) {
      alert("Please fill in patient name, patient ID, and appointment date.");
      return;
    }

    if (!doctorId) {
      alert("Doctor ID is missing. Please go back and select the doctor again.");
      return;
    }

    const url = `/payment?doctor=${encodeURIComponent(
      doctor
    )}&doctorId=${encodeURIComponent(
      doctorId
    )}&specialty=${encodeURIComponent(
      specialty
    )}&wallet=${encodeURIComponent(
      wallet
    )}&patient=${encodeURIComponent(
      name
    )}&patientId=${encodeURIComponent(
      patientId
    )}&date=${encodeURIComponent(date)}`;

    router.push(url);
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
        <h1 className="text-3xl font-bold mb-6">Book Appointment</h1>

        <div className="bg-white p-6 rounded-lg shadow max-w-lg">
          <div className="mb-6">
            <p>
              <strong>Doctor:</strong> {doctor}
            </p>
            <p>
              <strong>Specialty:</strong> {specialty}
            </p>
            <p className="text-sm text-gray-500 break-all">
              <strong>Wallet:</strong> {wallet}
            </p>
          </div>

          <label className="block mb-2 font-semibold">Patient Name</label>
          <input
            type="text"
            className="w-full border p-2 mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter patient name"
          />

          <label className="block mb-2 font-semibold">Patient ID</label>
          <input
            type="text"
            className="w-full border p-2 mb-4"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="e.g. patient-001"
          />

          <label className="block mb-2 font-semibold">
            Appointment Date
          </label>
          <input
            type="date"
            className="w-full border p-2 mb-4"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            onClick={handleBooking}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Proceed to Payment
          </button>
        </div>
      </main>
    </>
  );
}