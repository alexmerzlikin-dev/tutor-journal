import { Lesson } from "@prisma/client";
import { create } from "zustand";

interface LessonDTO {
  tutorId: string;
  studentId: string;
  subject: string;
  date: Date;
  startTime: string;
  endTime: string;
  topic: string;
}

interface Query {
  userId: string;
  role: string;
  date: Date;
}

interface StoreState {
  lessons: Lesson[];
  lesson: Lesson;
  loading: boolean;
  postLesson: (lesson: LessonDTO) => void;
  getLessons: (query: Query) => void;
  deleteLessonById: (lessonId: string) => void;
  putLessonById: (lesson: LessonDTO) => void;
  getLessonById: (id: string) => void;
}

export const useLessonsStore = create<StoreState>((set) => ({
  loading: false,
  lessons: [],
  lesson: {
    id: "",
    tutorId: "",
    studentId: "",
    subject: "",
    topic: "",
    date: new Date(),
    startTime: "",
    endTime: "",
    status: "",
    createdAt: new Date(),
  },
  getLessons: async (query) => {
    const q = new URLSearchParams(
      `?userId=${query.userId}&role=${query.role}&date=${query.date}`
    );

    const res = await fetch(`/api/lessons?${q}`, {
      method: "GET",
    });
    const lessons = await res.json();

    set(() => ({
      lessons,
    }));
  },
  postLesson: async (lesson) => {
    await fetch(`/api/lessons`, {
      method: "POST",
      body: JSON.stringify(lesson),
    });
  },
  deleteLessonById: async (lessonId) => {
    await fetch("/api/lessons", {
      method: "DELETE",
      body: JSON.stringify({ lessonId }),
    });
  },
  putLessonById: async (lesson) => {
    await fetch("/api/users/tutor/lessons", {
      method: "PUT",
      body: JSON.stringify(lesson),
    });
  },
  getLessonById: async (id) => {
    set({ loading: true });

    const res = await fetch(`/api/lessons/${id}`);
    const data = await res.json();

    set({
      lesson: data.lesson,
      loading: false,
    });
  },
}));
