import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("userId");
    const role = searchParams.get("role");
    const date = searchParams.get("date");

    if (!id || !role || !date) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const startDay = new Date(date);
    startDay.setHours(0, 0, 0, 0);
    const endDay = new Date(date);
    endDay.setHours(23, 59, 59, 999);

    if (role === "tutor") {
      const tutor = await prisma.tutor.findUnique({ where: { userId: id } });

      if (!tutor) {
        return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
      }

      const lessons = await prisma.lesson.findMany({
        where: {
          tutorId: tutor.id,
          date: {
            gte: startDay,
            lte: endDay,
          },
        },
        include: {
          comments: {
            include: {
              user: { select: { email: true, realName: true, image: true } },
            },
          },
        },
      });

      if (!lessons) {
        return NextResponse.json(
          { error: "Lessons not found" },
          { status: 200 }
        );
      }

      return NextResponse.json(lessons, { status: 200 });
    }

    if (role === "student") {
      const student = await prisma.student.findUnique({
        where: { userId: id },
      });

      if (!student) {
        return NextResponse.json(
          { error: "Student not found" },
          { status: 404 }
        );
      }

      const lessons = await prisma.lesson.findMany({
        where: {
          studentId: student.id,
          date: {
            gte: startDay,
            lte: endDay,
          },
        },
        include: {
          comments: {
            include: {
              user: { select: { email: true, realName: true, image: true } },
            },
          },
        },
      });

      if (!lessons) {
        return NextResponse.json(
          { error: "Lessons not found" },
          { status: 200 }
        );
      }

      return NextResponse.json(lessons, { status: 200 });
    }

    return NextResponse.json({ error: "Role not found" }, { status: 400 });
  } catch (e) {
    const err = e as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { tutorId, studentId, subject, topic, date, startTime, endTime } =
      await req.json();
    console.log(tutorId);
    if (
      !tutorId ||
      !studentId ||
      !subject ||
      !topic ||
      !date ||
      !startTime ||
      !endTime
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const tutor = await prisma.tutor.findUnique({ where: { userId: tutorId } });
    if (!tutor) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }

    const student = await prisma.student.findUnique({
      where: { userId: studentId },
    });
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    await prisma.lesson.create({
      data: {
        tutorId: tutor.id,
        studentId: student.id,
        subject,
        topic,
        date,
        startTime,
        endTime,
      },
    });

    return NextResponse.json({ message: "Lesson created" }, { status: 200 });
  } catch (e) {
    const err = e as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { lessonId, studentId, subject, topic, date, startTime, endTime } =
      await req.json();

    if (!lessonId) {
      return NextResponse.json(
        { error: "Invalid input. lessonId required" },
        { status: 400 }
      );
    }

    const currentLesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });

    if (!currentLesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const updatedData = {
      studentId: studentId ?? currentLesson.studentId,
      subject: subject ?? currentLesson.subject,
      topic: topic ?? currentLesson.topic,
      date: date ?? currentLesson.date,
      startTime: startTime ?? currentLesson.startTime,
      endTime: endTime ?? currentLesson.endTime,
    };

    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: updatedData,
    });

    return NextResponse.json({ message: "Lesson updated" }, { status: 200 });
  } catch (e) {
    const err = e as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { lessonId } = await req.json();

    if (!lessonId) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await prisma.lesson.delete({
      where: {
        id: lessonId,
      },
    });

    return NextResponse.json({ message: "Lesson deleted" }, { status: 200 });
  } catch (e) {
    const err = e as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
