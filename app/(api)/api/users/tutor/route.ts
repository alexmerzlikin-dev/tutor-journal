import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const tutor = await prisma.tutor.findUnique({
    where: {
      userId,
    },
    include: { students: { include: { user: true } } },
  });

  if (!tutor) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  return NextResponse.json(tutor); 
}
