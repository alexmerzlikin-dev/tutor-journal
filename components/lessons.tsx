"use client";
import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { NewLessonForm } from "@/components/new-lesson-form";
import { ListOfLessons } from "@/components/list-of-lessons";

export const Lessons = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-xl border max-h-[345px] shadow"
      />

      <NewLessonForm lessonDate={date || new Date()} />
      <ListOfLessons date={date || new Date()} />
    </>
  );
};
