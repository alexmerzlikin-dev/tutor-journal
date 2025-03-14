"use client";
import { useEffect, useState, PropsWithChildren } from "react";
import { useSession } from "next-auth/react";
import { useTutorStore } from "@/store/tutor";
import { useStudentStore } from "@/store/student";
import { useLessonsStore } from "@/store/lessons";

const InitLoadingData = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const { getTutorById } = useTutorStore();
  const { getStudentById } = useStudentStore();
  const { getLessons } = useLessonsStore();

  const handleAllData = async () => {
    if (session?.user.role === "tutor") {
      await Promise.all([
        getTutorById(session?.user.id || ""),
        getLessons({
          userId: session?.user.id || "",
          role: session.user.role,
          date: new Date(),
        }),
      ]);
    }
    if (session?.user.role === "student") {
      await Promise.all([
        getStudentById(session?.user.id || ""),
        getLessons({
          userId: session?.user.id || "",
          role: session.user.role,
          date: new Date(),
        }),
      ]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    <div>preloader</div>;
  }

  return <>{children}</>;
};

export default InitLoadingData;
