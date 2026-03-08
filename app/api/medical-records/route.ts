export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

function generateRecordHash(data: {
  patientId: string;
  doctorId: string;
  diagnosis: string;
  prescription?: string | null;
  notes?: string | null;
}) {
  const raw = `${data.patientId}|${data.doctorId}|${data.diagnosis}|${data.prescription ?? ""}|${data.notes ?? ""}|${Date.now()}`;
  let hash = 0;

  for (let i = 0; i < raw.length; i++) {
    const chr = raw.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }

  return `MRH-${Math.abs(hash)}-${Date.now()}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const patientId = body.patientId as string | undefined;
    const doctorId = body.doctorId as string | undefined;
    const diagnosis = body.diagnosis as string | undefined;
    const prescription = body.prescription as string | undefined;
    const notes = body.notes as string | undefined;

    if (!patientId || !doctorId || !diagnosis) {
      return Response.json(
        { error: "patientId, doctorId, and diagnosis are required" },
        { status: 400 }
      );
    }

    const recordHash = generateRecordHash({
      patientId,
      doctorId,
      diagnosis,
      prescription,
      notes,
    });

    const medicalRecord = await prisma.medicalRecord.create({
      data: {
        patientId,
        doctorId,
        diagnosis,
        prescription: prescription ?? null,
        notes: notes ?? null,
        recordHash,
      },
    });

    return Response.json(medicalRecord, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create medical record", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const patientId = searchParams.get("patientId");
    const doctorId = searchParams.get("doctorId");

    const records = await prisma.medicalRecord.findMany({
      where: {
        ...(patientId ? { patientId } : {}),
        ...(doctorId ? { doctorId } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(records);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch medical records", details: String(error) },
      { status: 500 }
    );
  }
}