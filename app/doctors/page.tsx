"use client";

import Navbar from "@/components/Navbar";
import { useSearchParams } from "next/navigation";

const doctors = [
  {
    name: "Dr Ability Ifa",
    specialty: "Cardiologist",
    wallet: "0x8192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4",
  },
  {
    name: "Dr James Apah",
    specialty: "General Physician",
    wallet: "0x1111111111111111111111111111111111111111",
  },
  {
    name: "Dr Faith Bob",
    specialty: "Neurologist",
    wallet: "0x708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b",
  },
  {
    name: "Dr Maxwell Tay",
    specialty: "Dentist",
    wallet: "0x6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a",
  },
  {
    name: "Dr Jeremiah Mason",
    specialty: "Ophthalmologist",
    wallet: "0x4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708",
  },
  {
    name: "Dr Joseph Ufia",
    specialty: "Psychiatrist",
    wallet: "0x92a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d",
  },
  {
    name: "Dr Faith Osimhen",
    specialty: "Gynecologist",
    wallet: "0x5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f70819",
  },
  {
    name: "Dr Jacob Sunday",
    specialty: "Dermatology",
    wallet: "0x2222222222222222222222222222222222222222",
  },
  {
    name: "Dr Samuel Moore",
    specialty: "Pediatric",
    wallet: "0x3333333333333333333333333333333333333333",
  },
  {
    name: "Dr Precious John",
    specialty: "Optician",
    wallet: "0xa3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e",
  },
];

export default function DoctorsPage() {
  const searchParams = useSearchParams();
  const selectedSpecialty = searchParams.get("specialty");

  const filteredDoctors = selectedSpecialty
    ? doctors.filter((doctor) => doctor.specialty === selectedSpecialty)
    : doctors;

  return (
    <>
      <Navbar />
      <div className="p-6">
  <a href="/" className="text-blue-600 hover:underline">
    ← Back to Home
  </a>
</div>

      <main className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          {selectedSpecialty ? `${selectedSpecialty} Doctors` : "Available Doctors"}
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.wallet}
              className="bg-white p-6 rounded-lg shadow"
            >
              <h2 className="text-xl font-semibold">
                {doctor.name}
              </h2>

              <p className="text-gray-600">
                {doctor.specialty}
              </p>

              <p className="text-sm text-gray-400 mt-2 break-all">
                {doctor.wallet}
              </p>

              <a
                href={`/booking?doctor=${encodeURIComponent(doctor.name)}&specialty=${encodeURIComponent(doctor.specialty)}&wallet=${doctor.wallet}`}
                className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Book Appointment
              </a>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <p className="mt-6 text-red-500">
            No doctors found for this specialty.
          </p>
        )}
      </main>
    </>
  );
}