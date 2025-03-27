import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const comments = prisma.comment.findMany({
      where: {
        lessonId: id,
      },
    });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { userId, message } = await request.json();

    if (!id || !userId || !message) {
      return NextResponse.json({ error: "Invalide input" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 400 });
    }

    const lesson = await prisma.lesson.findUnique({
      where: {
        id,
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson Not Found" }, { status: 400 });
    }

    await prisma.comment.create({
      data: {
        lessonId: lesson.id,
        userId: user.id,
        message,
      },
    });

    const updateLesson = await prisma.lesson.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json({ lesson: updateLesson }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
}
