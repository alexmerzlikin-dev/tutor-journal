"use client";
import { useStudentStore } from "@/store/student";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";

export const StudentTutors = () => {
  const { tutors } = useStudentStore();
  const { data: sesssion } = useSession();

  if (sesssion?.user.role !== "student") {
    return null;
  }

  return (
    <Card className="w-full md:w-[320px] h-max">
      <CardHeader>
        <CardTitle>Репетиторы</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {tutors?.map((tutor) => (
          <div
            className="border p-2 rounded-lg flex items-center justify-between"
            key={tutor.user.id}
          >
            <Avatar className="h-9 w-9 rounded-lg">
              <AvatarImage
                src={tutor.user.image || ""}
                alt={tutor?.user.name || ""}
              />
              <AvatarFallback className="rounded-lg">
                {tutor?.user.email?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm truncate">{tutor.user.realName}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
