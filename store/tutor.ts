import { Student, User } from "@prisma/client";
import { create } from "zustand";

interface StudentType extends Student {
  user: User;
}

interface StoreState {
  level: string;
  students: StudentType[];
  getTutorById: (id: string) => void;
  newStudentByEmail: (id: string, email: string) => void;
  deleteStudentByEmail: (id: string, email: string) => void;
}

export const useTutorStore = create<StoreState>()((set) => ({
  level: "0",
  students: [],
  getTutorById: async (id) => {
    const res = await fetch(`/api/users/tutor?userId=${id}`, {
      method: "GET",
    });
    const tutor = await res.json();

    set(() => ({
      level: tutor.level,
      students: tutor.students,
    }));
  },
  newStudentByEmail: async (id, email) => {
    const body = JSON.stringify({
      id,
      studentEmail: email,
    });

    const res = await fetch("/api/users/tutor/students", {
      method: "POST",
      body,
    });
    const updateTutor = await res.json();

    set(() => ({
      students: updateTutor.students,
    }));
  },
  deleteStudentByEmail: async (id, email) => {
    const body = JSON.stringify({
      id,
      studentEmail: email,
    });

    const res = await fetch("/api/users/tutor/students", {
      method: "DELETE",
      body,
    });
    const updateTutor = await res.json();

    set(() => ({
      students: updateTutor.students,
    }));
  },
}));
