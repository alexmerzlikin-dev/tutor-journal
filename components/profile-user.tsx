"use client";

import { useSession } from "next-auth/react";

import { Card, CardDescription, CardHeader } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export function ProfileUser() {
  const { data: session } = useSession();

  return (
    <Card className="w-full md:w-[320px] h-max">
      <CardHeader>
        <div className="flex flex-col items-center justify-center gap-1">
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarImage
              src={session?.user?.image || ""}
              alt={session?.user?.name || ""}
            />
            <AvatarFallback className="rounded-lg">
              {session?.user.email?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-lg font-bold">{session?.user.realName}</span>
          <CardDescription>
            {session?.user.city}, {session?.user.country}
          </CardDescription>{" "}
          <CardDescription>
            Часовой пояс по МСК {session?.user.timeZone}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
