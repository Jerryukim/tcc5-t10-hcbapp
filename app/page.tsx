"use client";

import Link from "next/link";

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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          Web3 Healthcare Booking App
        </h1>

        <p className="text-gray-600 mb-8">
          A decentralized healthcare platform for booking appointments,
          making payments with MetaMask, and securely storing medical records.
        </p>

        {/* PORTALS */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {/* PATIENT BOOKING */}

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-3">
              Patient Portal
            </h2>

            <p className="text-gray-600 mb-4">
              Book appointments with doctors and pay securely using MetaMask.
            </p>

            <p className="text-sm text-gray-500">
              Flow: Specialty → Doctor → Booking → Payment
            </p>
          </div>

          {/* DOCTOR PORTAL */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-semibold mb-3">
              Doctor Portal
            </h2>

            <p className="text-gray-600 mb-5">
              Doctors can enter diagnosis details and store the medical record hash on-chain.
            </p>

            <Link
              href="/doctor-record"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Open Doctor Portal
            </Link>

          </div>

          {/* PATIENT RECORDS */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-semibold mb-3">
              Patient Records
            </h2>

            <p className="text-gray-600 mb-5">
              Patients can view their diagnosis, prescription, and medical records stored securely.
            </p>

            <Link
              href="/patient-records"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              View Medical Records
            </Link>

          </div>

        </div>

        {/* SPECIALTY LIST */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-3">
            Book Appointment
          </h2>

          <p className="text-gray-600 mb-6">
            Select a medical specialty to find available doctors.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {specialties.map((specialty) => (

              <Link
                key={specialty}
                href={`/doctors?specialty=${encodeURIComponent(specialty)}`}
                className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600 hover:scale-105 transition transform shadow-md"
              >
                {specialty}
              </Link>

            ))}

          </div>

        </div>

      </div>
    </main>
  );
}