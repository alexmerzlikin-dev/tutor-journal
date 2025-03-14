import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const {
      email,
      realName,
      role,
      studentClass,
      tutorLevel,
      timeZone,
      city,
      country,
    } = await req.json();

    if (!email || !realName || !role) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { student: true, tutor: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const roleChanged = user.role !== role;

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { realName, role, timeZone, city, country },
    });

    const promises: Promise<unknown>[] = [];

    if (role === "student") {
      promises.push(
        prisma.student.upsert({
          where: { userId: user.id },
          update: roleChanged ? {} : { class: studentClass || "" },
          create: { userId: user.id, class: studentClass || "" },
        })
      );
    } else if (role === "tutor") {
      promises.push(
        prisma.tutor.upsert({
          where: { userId: user.id },
          update: roleChanged ? {} : { level: tutorLevel || "" },
          create: { userId: user.id, level: tutorLevel || "" },
        })
      );
    }

    if (roleChanged) {
      if (user.role === "student" && user.student) {
        promises.push(prisma.student.delete({ where: { userId: user.id } }));
      } else if (user.role === "tutor" && user.tutor) {
        promises.push(prisma.tutor.delete({ where: { userId: user.id } }));
      }
    }

    await Promise.all(promises);

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
