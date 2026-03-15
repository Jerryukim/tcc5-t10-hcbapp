import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.attendance.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { doctorId, patientId, date } = body;

    if (!doctorId || !patientId || !date) {
      return NextResponse.json(
        { error: "Missing required booking data" },
        { status: 400 }
      );
    }

    const doctor = await prisma.user.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor not found" },
        { status: 404 }
      );
    }

    let patient = await prisma.user.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      patient = await prisma.user.create({
        data: {
          id: patientId,
          name: patientId,
          email: `${patientId}@test.com`,
          wallet: `wallet-${patientId}`,
          role: "USER",
        },
      });
    }

    const existingBooking = await prisma.attendance.findFirst({
      where: {
        doctorId,
        date: new Date(date),
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "This doctor already has a booking on that date." },
        { status: 400 }
      );
    }

    const booking = await prisma.attendance.create({
      data: {
        doctorId,
        patientId,
        date: new Date(date),
        status: "PENDING",
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const updatedBooking = await prisma.attendance.update({
      where: { id: body.id },
      data: {
        status: body.status ?? undefined,
        consultationLink: body.consultationLink ?? undefined,
      },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}