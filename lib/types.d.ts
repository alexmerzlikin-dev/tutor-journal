import { Student, Tutor, User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User & Tutor & Student;
  }
}

declare module "next-auth" {
  type JWT = User & Tutor & Student;
}
