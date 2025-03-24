import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const lesson = await prisma.lesson.findUnique({ where: { id } });

  return NextResponse.json({ lesson }, { status: 200 });
}
