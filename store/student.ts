import { Student, User } from "@prisma/client";
import { create } from "zustand";

interface TytorType extends Student {
  user: User;
}

interface StoreState {
  class: string;
  tutors: TytorType[];
  getStudentById: (id: string) => void;
}

export const useStudentStore = create<StoreState>()((set) => ({
  class: "0",
  tutors: [],
  getStudentById: async (id) => {
    const res = await fetch(`/api/users/student?userId=${id}`, {
      method: "GET",
    });
    const student = await res.json();
    console.log(student)
    set(() => ({
      class: student.class,
      tutors: student.tutors,
    }));
  },
}));
