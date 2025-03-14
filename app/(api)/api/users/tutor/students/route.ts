import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, studentEmail } = await req.json();

    if (!id || !studentEmail) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const [tutor, studentUserWithStudent] = await Promise.all([
      prisma.tutor.findUnique({
        where: { userId: id },
      }),
      prisma.user.findUnique({
        where: { email: studentEmail },
        include: { student: true },
      }),
    ]);

    if (!tutor) {
      return NextResponse.json({ error: "Invalid tutor id" }, { status: 400 });
    }

    if (!studentUserWithStudent || !studentUserWithStudent.student) {
      return NextResponse.json({ error: "User not student" }, { status: 400 });
    }

    const isAlreadyConnected = await prisma.tutor.findFirst({
      where: {
        userId: id,
        students: {
          some: { userId: studentUserWithStudent.id },
        },
      },
    });

    if (isAlreadyConnected) {
      return NextResponse.json(
        { error: "Student already assigned to this tutor" },
        { status: 400 }
      );
    }

    const updateTutor = await prisma.tutor.update({
      where: { userId: id },
      data: {
        students: {
          connect: { userId: studentUserWithStudent.id },
        },
      },
      include: {
        students: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(updateTutor);
  } catch (error) {
    console.error("Error adding student to tutor:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id, studentEmail } = await req.json();
    console.log(id, studentEmail)
    if (!id || !studentEmail) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const [tutor, studentUserWithStudent] = await Promise.all([
      prisma.tutor.findUnique({
        where: { userId: id },
      }),
      prisma.user.findUnique({
        where: { email: studentEmail },
        include: { student: true },
      }),
    ]);

    if (!tutor) {
      return NextResponse.json({ error: "Invalid tutor id" }, { status: 400 });
    }

    if (!studentUserWithStudent || !studentUserWithStudent.student) {
      return NextResponse.json({ error: "User not student" }, { status: 400 });
    }

    const isAlreadyConnected = await prisma.tutor.findFirst({
      where: {
        userId: id,
        students: {
          some: { userId: studentUserWithStudent.id },
        },
      },
    });

    if (!isAlreadyConnected) {
      return NextResponse.json(
        { error: "Student is not linked to this tutor" },
        { status: 400 }
      );
    }

    const tutorUpdated = await prisma.tutor.update({
      where: { userId: id },
      data: {
        students: {
          disconnect: { userId: studentUserWithStudent.id },
        },
      },
    });

    return NextResponse.json(tutorUpdated);
  } catch (error) {
    console.error("Error removing student from tutor:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
