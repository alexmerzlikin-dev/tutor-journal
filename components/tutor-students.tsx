"use client";
import { X } from "lucide-react";
import { useTutorStore } from "@/store/tutor";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

export const TutorStudents = () => {
  const { students, deleteStudentByEmail } = useTutorStore();
  const { data: session } = useSession();

  return (
    <Card className="w-full md:w-[320px] h-max">
      <CardHeader>
        <CardTitle>Мои ученики</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {students?.map((student) => (
          <div
            className="border p-2 rounded-lg flex items-center justify-between"
            key={student.user.id}
          >
            <Avatar className="h-9 w-9 rounded-lg">
              <AvatarImage
                src={student.user.image || ""}
                alt={student?.user.name || ""}
              />
              <AvatarFallback className="rounded-lg">
                {student?.user.email?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm truncate">{student.user.realName}</p>
            <Button
              variant="destructive"
              size="icon"
              onClick={async () =>
                await deleteStudentByEmail(
                  session?.user.id || "",
                  student.user.email || ""
                )
              }
            >
              <X />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
