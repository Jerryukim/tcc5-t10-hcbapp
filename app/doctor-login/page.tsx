"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  role: string;
};

export default function DoctorLogin() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    async function loadDoctors() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (Array.isArray(data)) {
          const onlyDoctors = data.filter(
            (user: any) => user.role === "ADMIN"
          );
          setDoctors(onlyDoctors);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Failed to load doctors:", error);
        setDoctors([]);
      }
    }

    loadDoctors();
  }, []);

  function loginAsDoctor(doctor: Doctor) {
    localStorage.setItem("userRole", "doctor");
    localStorage.setItem("doctorId", doctor.id);
    localStorage.setItem("doctorName", doctor.name);

    router.push("/doctor-dashboard");
  }

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Select Doctor</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white p-6 rounded shadow">
            <h2 className="font-bold text-lg">{doctor.name}</h2>
            <p className="text-gray-500">{doctor.specialty}</p>

            <button
              onClick={() => loginAsDoctor(doctor)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login as Doctor
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}