import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(users);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        wallet: body.wallet,
        role: body.role || "USER",
        specialty: body.specialty || null,
      },
    });

    return Response.json(newUser);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
