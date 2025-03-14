"use client";

import * as React from "react";
import { Book, Command, Settings } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const data = {
    teams: [
      {
        name: "Журнал репетитора",
        logo: Command,
        plan: "",
      },
    ],
    navMain: [
      {
        title: "Журнал",
        url: "",
        icon: Book,
        isActive: true,
        items: [
          {
            title: "Занятия",
            url: "/journal/lessons",
          },
          session?.user.role === "tutor"
            ? {
                title: "Ученики",
                url: "/journal/students",
              }
            : {
                title: "Репетиторы",
                url: "/journal/tutors",
              },
        ],
      },
      {
        title: "Настройки",
        url: "/settings",
        icon: Settings,
        isActive: true,
        items: [
          {
            title: "Профиль",
            url: "/settings/profile",
          },
          {
            title: "Оформление",
            url: "/settings/customization",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
