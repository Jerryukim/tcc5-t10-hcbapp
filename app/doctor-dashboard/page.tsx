"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DoctorDashboardPage() {
  const router = useRouter();

  const [doctorName, setDoctorName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkInputs, setLinkInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const savedDoctorName = localStorage.getItem("doctorName") || "";
    const savedDoctorId = localStorage.getItem("doctorId") || "";

    if (role !== "doctor") {
      router.push("/");
      return;
    }

    setDoctorName(savedDoctorName);
    setDoctorId(savedDoctorId);

    loadBookings(savedDoctorId);
  }, [router]);

  async function loadBookings(savedDoctorId: string) {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();

      const filtered = Array.isArray(data)
        ? data.filter((booking: any) => booking.doctorId === savedDoctorId)
        : [];

      setBookings(filtered);

      const initialLinks: Record<string, string> = {};
      filtered.forEach((booking: any) => {
        initialLinks[booking.id] = booking.consultationLink || "";
      });
      setLinkInputs(initialLinks);
    } catch (error) {
      console.error("Failed to load bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  async function acceptBooking(id: string) {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status: "ACCEPTED",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update booking");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status: "ACCEPTED" } : booking
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to accept booking");
    }
  }

  async function saveConsultationLink(id: string) {
    try {
      const consultationLink = linkInputs[id];

      if (!consultationLink) {
        alert("Please enter a consultation link");
        return;
      }

      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          consultationLink,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save consultation link");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, consultationLink } : booking
        )
      );

      alert("Consultation link saved");
    } catch (error) {
      console.error(error);
      alert("Failed to save consultation link");
    }
  }

  function logout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("doctorName");
    localStorage.removeItem("doctorId");
    router.push("/");
  }

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          {doctorName && (
            <p className="text-gray-600 mt-2">
              Logged in as: <strong>{doctorName}</strong>
            </p>
          )}
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Patient Bookings</h2>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings assigned to this doctor yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border p-4 rounded">
                <p><strong>Patient ID:</strong> {booking.patientId}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
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

                {booking.status === "PENDING" && (
                  <button
                    onClick={() => acceptBooking(booking.id)}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Accept Booking
                  </button>
                )}

                {booking.status === "ACCEPTED" && (
                  <div className="mt-4">
                    <label className="block mb-2 font-semibold">
                      Consultation Link
                    </label>

                    <input
                      type="text"
                      value={linkInputs[booking.id] || ""}
                      onChange={(e) =>
                        setLinkInputs((prev) => ({
                          ...prev,
                          [booking.id]: e.target.value,
                        }))
                      }
                      placeholder="Paste Google Meet or Zoom link"
                      className="w-full border p-2 rounded mb-3"
                    />

                    <button
                      onClick={() => saveConsultationLink(booking.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Save Consultation Link
                    </button>

                    {booking.consultationLink && (
                      <p className="mt-3 text-sm break-all text-gray-600">
                        Saved Link: {booking.consultationLink}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Doctor Portal</h2>

        <p className="text-gray-600 mb-6">
          Create medical records and store record hashes on-chain.
        </p>

        <div className="flex gap-4 flex-wrap">
          <Link
            href="/doctor-record"
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Open Doctor Record Page
          </Link>

          <Link
            href="/patient-records"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            View Patient Records
          </Link>
        </div>
      </div>
    </main>
  );
}