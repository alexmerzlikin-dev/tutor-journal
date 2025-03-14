import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
    include: { tutors: { include: { user: true } } },
  });

  if (!student) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  return NextResponse.json(student);
}
