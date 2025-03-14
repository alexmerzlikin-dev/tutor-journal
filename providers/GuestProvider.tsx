"use client";
import { useEffect, PropsWithChildren } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const GuestProvider = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading") {
      if (!session?.user.role) {
        router.push("/guest");
      }

      if (session?.user.role === "tutor" || session?.user.role === "student") {
        router.push("/");
      }
    }
  }, [session, router, status]);

  if(status === 'loading') {
    return <div>preloader</div>
  }

  return <>{children}</>;
};

export default GuestProvider;
