"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

type Doctor = {
  id: string;
  name: string;
  email: string;
  wallet: string;
  specialty: string;
};

export default function DoctorsPage() {
  const searchParams = useSearchParams();
  const selectedSpecialty = searchParams.get("specialty");

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDoctors() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          console.error("Expected array from /api/users but got:", data);
          setDoctors([]);
        }
      } catch (error) {
        console.error("Failed to load doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    }

    loadDoctors();
  }, []);

  const filteredDoctors = Array.isArray(doctors)
    ? selectedSpecialty
      ? doctors.filter(
          (doctor) =>
            doctor.specialty &&
            doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
        )
      : doctors
    : [];

  return (
    <>
      <Navbar />

      <div className="p-6">
        <a href="/patient-dashboard" className="text-blue-600 hover:underline">
          ← Back to Patient Dashboard
        </a>
      </div>

      <main className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          {selectedSpecialty
            ? `${selectedSpecialty} Doctors`
            : "Available Doctors"}
        </h1>

        {loading ? (
          <p>Loading doctors...</p>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-red-500">No doctors found for this specialty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h2 className="text-xl font-semibold">{doctor.name}</h2>

                <p className="text-gray-600 mt-2">{doctor.specialty}</p>

                <p className="text-sm text-gray-400 mt-3 break-all">
                  {doctor.wallet}
                </p>

                <a
                  href={`/booking?doctor=${encodeURIComponent(
                    doctor.name
                  )}&doctorId=${encodeURIComponent(
                    doctor.id
                  )}&specialty=${encodeURIComponent(
                    doctor.specialty
                  )}&wallet=${doctor.wallet}`}
                  className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Book Appointment
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}