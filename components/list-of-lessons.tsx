"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { useLessonsStore } from "@/store/lessons";
import { Trash as TrashIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTutorStore } from "@/store/tutor";
import { useStudentStore } from "@/store/student";

interface Props {
  date: Date;
}

export function ListOfLessons({ date }: Props) {
  const { data: session } = useSession();
  const { lessons, getLessons, deleteLessonById } = useLessonsStore();
  const { students } = useTutorStore();
  const { tutors } = useStudentStore();

  const query = {
    date,
    userId: session?.user.id || "",
    role: session?.user.role || "",
  };

  useEffect(() => {
    getLessons(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  async function handleDelete(id: string) {
    await deleteLessonById(id);
    await getLessons(query);
  }

  return (
    <Card className="p-4 w-[340px] max-h-[600px] flex flex-col gap-2 overflow-y-auto">
      <CardHeader>
        <CardTitle>
          Ваши занятия на {date.getDate()}.{date.getMonth()}.
          {date.getFullYear()}
        </CardTitle>
      </CardHeader>
      {lessons.length ? (
        lessons.map((lesson) => {
          return (
            <Link key={lesson.id} href={`/journal/lessons/${lesson.id}`}>
              <Card className="hover:border-6">
                <CardHeader>
                  <CardTitle>{lesson.topic}</CardTitle>
                  <CardDescription>Предмет: {lesson.subject}</CardDescription>
                  {session?.user.role === "tutor" &&
                    students.map((student) => {
                      if (student.id === lesson.studentId) {
                        return (
                          <CardDescription key={student.id}>
                            Ученик: {student.user.realName}
                          </CardDescription>
                        );
                      }
                    })}
                  {session?.user.role === "student" &&
                    tutors.map((tutor) => {
                      if (tutor.id === lesson.tutorId) {
                        return (
                          <CardDescription key={tutor.id}>
                            Репетитор: {tutor.user.realName}
                          </CardDescription>
                        );
                      }
                    })}
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Время проведения: {lesson.startTime} - {lesson.endTime}
                  </CardDescription>
                  <CardDescription></CardDescription>
                </CardContent>
                {session?.user.role === "tutor" && (
                  <CardFooter className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleDelete(lesson.id)}
                      size="icon"
                      variant="destructive"
                      className="self-end"
                    >
                      <TrashIcon />
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </Link>
          );
        })
      ) : (
        <div>занятий нет</div>
      )}
    </Card>
  );
}
