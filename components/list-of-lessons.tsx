"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { useLessonsStore } from "@/store/lessons";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTutorStore } from "@/store/tutor";

interface Props {
  date: Date;
}

export function ListOfLessons({ date }: Props) {
  const { data: session } = useSession();
  const { lessons, getLessons } = useLessonsStore();
  const { students } = useTutorStore();

  useEffect(() => {
    const query = {
      date,
      userId: session?.user.id || "",
      role: session?.user.role || "",
    };
    getLessons(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Card className="p-4 w-[340px] max-h-[600px] flex flex-col gap-2 overflow-y-auto">
      {lessons.length ? (
        lessons.map((lesson) => {
          return (
            <Card key={lesson.id}>
              <CardHeader>
                <CardTitle>{lesson.topic}</CardTitle>
                <CardDescription>Предмет: {lesson.subject}</CardDescription>
                {students.map((student) => {
                  if (student.id === lesson.studentId) {
                    return (
                      <CardDescription key={student.id}>
                        Ученик: {student.user.realName}
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
            </Card>
          );
        })
      ) : (
        <div>занятий нет</div>
      )}
    </Card>
  );
}
