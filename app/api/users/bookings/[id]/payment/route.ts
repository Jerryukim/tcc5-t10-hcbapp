export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;
    const body = await request.json();

    const hashProof = body.hashProof as string | undefined;

    if (!hashProof) {
      return Response.json(
        { error: "hashProof is required" },
        { status: 400 }
      );
    }

    const booking = await prisma.attendance.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return Response.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    const updatedBooking = await prisma.attendance.update({
      where: { id: bookingId },
      data: { hashProof },
    });

    return Response.json(updatedBooking);
  } catch (error) {
    return Response.json(
      { error: "Failed to attach payment proof", details: String(error) },
      { status: 500 }
    );
  }
}