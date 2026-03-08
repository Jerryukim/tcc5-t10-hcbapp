export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const doctorId = body.doctorId as string | undefined;
    const patientId = body.patientId as string | undefined;
    const date = body.date as string | undefined; // your schema uses "date"

    if (!doctorId || !patientId || !date) {
      return Response.json(
        { error: "doctorId, patientId, date are required" },
        { status: 400 }
      );
    }

    // 1) doctor must exist and be ADMIN (your doctors are ADMIN)
    const doctor = await prisma.user.findUnique({ where: { id: doctorId } });
    if (!doctor || doctor.role !== "ADMIN") {
      return Response.json({ error: "Invalid doctorId" }, { status: 400 });
    }

    // 2) patient must exist
    const patient = await prisma.user.findUnique({ where: { id: patientId } });
    if (!patient) {
      return Response.json({ error: "Invalid patientId" }, { status: 400 });
    }

    // 3) prevent double booking: same doctor + same date
    const existing = await prisma.attendance.findFirst({
      where: {
        doctorId,
        date: new Date(date),
      },
    });

    if (existing) {
      return Response.json(
        { error: "Doctor already booked for this time" },
        { status: 409 }
      );
    }

    // 4) create booking
    const booking = await prisma.attendance.create({
      data: {
        doctorId,
        patientId,
        date: new Date(date),
      },
    });

    return Response.json(booking, { status: 201 });
  } catch (err) {
    return Response.json(
      { error: "Failed to create booking", details: String(err) },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get("doctorId");
  const patientId = searchParams.get("patientId");

  const bookings = await prisma.attendance.findMany({
    where: {
      ...(doctorId ? { doctorId } : {}),
      ...(patientId ? { patientId } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(bookings);
}