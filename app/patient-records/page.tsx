"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type MedicalRecord = {
  id: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  prescription?: string | null;
  notes?: string | null;
  recordHash?: string | null;
  createdAt: string;
};

export default function PatientRecordsPage() {
  const router = useRouter();

  const [patientId, setPatientId] = useState("");
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function fetchRecords() {
    try {
      if (!patientId) {
        alert("Please enter a patient ID.");
        return;
      }

      setLoading(true);
      setStatus("Fetching medical records...");

      const res = await fetch(
        `/api/medical-records?patientId=${encodeURIComponent(patientId)}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch records");
      }

      setRecords(data);
      setStatus(data.length > 0 ? "Records loaded successfully." : "No records found.");
    } catch (error: any) {
      console.error(error);
      setStatus(error?.message || "Failed to fetch records");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <button
        onClick={() => router.back()}
        className="text-blue-600 mb-6 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">Patient Medical Records</h1>

      <p className="text-gray-600 mb-6">
        Patients can enter their Patient ID to view diagnosis, prescription,
        notes, and record hash.
      </p>

      <div className="border p-6 rounded shadow bg-white mb-8">
        <label className="block mb-2 font-semibold">Patient ID</label>

        <input
          className="w-full border p-2 mb-4"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Enter patient ID"
        />

        <button
          onClick={fetchRecords}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Loading..." : "View Records"}
        </button>

        {status && (
          <p className="mt-4 text-sm text-gray-600">{status}</p>
        )}
      </div>

      <div className="space-y-6">
        {records.map((record) => (
          <div key={record.id} className="border p-6 rounded shadow bg-white">
            <p>
              <strong>Patient ID:</strong> {record.patientId}
            </p>

            <p>
              <strong>Doctor ID:</strong> {record.doctorId}
            </p>

            <p className="mt-3">
              <strong>Diagnosis:</strong> {record.diagnosis}
            </p>

            <p className="mt-2">
              <strong>Prescription:</strong> {record.prescription || "N/A"}
            </p>

            <p className="mt-2">
              <strong>Notes:</strong> {record.notes || "N/A"}
            </p>

            <p className="mt-2 break-all text-sm text-gray-600">
              <strong>Record Hash:</strong> {record.recordHash || "N/A"}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              <strong>Date Created:</strong>{" "}
              {new Date(record.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}