"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function PatientDashboard() {
  const router = useRouter();

  const [patientId, setPatientId] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  function logout() {
    localStorage.removeItem("userRole");
    router.push("/");
  }

  async function checkBookingStatus() {
    if (!patientId) {
      alert("Please enter your patient ID");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/bookings");
      const data = await res.json();

      if (Array.isArray(data)) {
        const filtered = data.filter(
          (booking: any) => booking.patientId === patientId
        );
        setBookings(filtered);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-3">Book Appointment</h2>
          <p className="text-gray-600 mb-5">
            Select a specialty and book an appointment with a doctor.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-3">Medical Records</h2>
          <p className="text-gray-600 mb-5">
            View your diagnosis, prescriptions, and stored medical records.
          </p>

          <Link
            href="/patient-records"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            View Medical Records
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-3">Choose Specialty</h2>

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

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-3">Check Booking Status</h2>

        <p className="text-gray-600 mb-4">
          Enter your patient ID to see your appointment status.
        </p>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="e.g. patient-demo"
            className="border p-3 rounded w-full max-w-sm"
          />

          <button
            onClick={checkBookingStatus}
            className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700"
          >
            Check
          </button>
        </div>

        {loading ? (
          <p>Loading booking status...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border p-4 rounded">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      booking.status === "ACCEPTED"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>

                <p>
                  <strong>Doctor ID:</strong> {booking.doctorId}
                </p>

                {booking.consultationLink && (
                  <div className="mt-3">
                    <a
                      href={booking.consultationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                      Join Consultation
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}