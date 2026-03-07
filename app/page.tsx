"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

const specialties = [
  "General Physician",
  "Dentist",
  "Gynecologist",
  "Pediatric",
  "Ophthalmologist",
  "Psychiatrist",
  "Dermatology",
  "Neurologist",
  "Optician",
  "Cardiologist",
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">
          Healthcare Booking App
        </h1>

        <p className="mb-6 text-gray-600">
          Select a medical specialty to book a doctor.
        </p>

        <div className="grid grid-cols-3 gap-4">
          {specialties.map((specialty) => (
            <Link
              key={specialty}
              href={`/doctors?specialty=${encodeURIComponent(specialty)}`}
              className="bg-blue-500 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-blue-600"
            >
              {specialty}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}