"use client";

import Navbar from "@/components/Navbar";
import { useSearchParams } from "next/navigation";

const doctors = [
  {
    name: "Dr Ability Ifa",
    specialty: "Cardiologist",
    wallet: "0x9f8F72aA9304c8B593d555F12ef6589Cc3A579A2",
  },
  {
    name: "Dr James Apah",
    specialty: "General Physician",
    wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  },
  {
    name: "Dr Faith Bob",
    specialty: "Neurologist",
    wallet: "0x53d284357ec70cE289D6D64134DfAc8E511c8a3D",
  },
  {
    name: "Dr Maxwell Tay",
    specialty: "Dentist",
    wallet: "0xfe9e8709d3215310075d67E3ed32A380CCf451C8",
  },
  {
    name: "Dr Jeremiah Mason",
    specialty: "Ophthalmologist",
    wallet: "0x66f820a414680B5bcda5eECA5dea238543F42054",
  },
  {
    name: "Dr Joseph Ufia",
    specialty: "Psychiatrist",
    wallet: "0x281055afc982d96Fab65b3a49c7F9dB21cF6bE8a",
  },
  {
    name: "Dr Faith Osimhen",
    specialty: "Gynecologist",
    wallet: "0xdc76cd25977e0a5ae17155770273ad58648900d3",
  },
  {
    name: "Dr Jacob Sunday",
    specialty: "Dermatology",
    wallet: "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
  },
  {
    name: "Dr Samuel Moore",
    specialty: "Pediatric",
    wallet: "0x583031d1113ad414f02576bd6afaBfb302140225",
  },
  {
    name: "Dr Precious John",
    specialty: "Optician",
    wallet: "0xdd870fa1b7c4700f2bd7f44238821c26f7392148",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.wallet}
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

        {filteredDoctors.length === 0 && (
          <p className="mt-6 text-red-500">
            No doctors found for this specialty.
          </p>
        )}
      </main>
    </>
  );
}