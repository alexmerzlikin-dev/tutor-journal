import { Lesson, User, Comment } from "@prisma/client";
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
  date?: Date;
}

interface CommentStore extends Comment {
  user: User;
}

interface LessonStore extends Lesson {
  comments: CommentStore[];
}

type StoreState = {
  lessons: LessonStore[];
  loading: boolean;
  postLesson: (lesson: LessonDTO) => void;
  getLessons: (query: Query) => void;
  deleteLessonById: (lessonId: string) => void;
  putLessonById: (lesson: LessonDTO) => void;
};

export const useLessonsStore = create<StoreState>((set) => ({
  loading: false,
  lessons: [],
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
}));
