"use client";
import { useLessonsStore } from "@/store/lessons";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useTutorStore } from "@/store/tutor";

interface Props {
  id: string;
}

export function Lesson({ id }: Props) {
  const { lesson, loading, getLessonById } = useLessonsStore();
  const { students } = useTutorStore();

  useEffect(() => {
    getLessonById(id);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Журнал</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Занятие</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{lesson.subject}</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{lesson.topic}</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {students.find((student) => {
              if (student.id === lesson.studentId) {
                return student;
              }
            })?.user.realName || ""}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-wrap gap-5">
        
      </div>
    </>
  );
}
