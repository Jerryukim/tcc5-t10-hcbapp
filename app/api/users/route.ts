import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get("specialty");

  const users = await prisma.user.findMany({
    where: {
      role: "ADMIN",
      ...(specialty ? { specialty } : {}),
    },
  });

  return Response.json(users);
}