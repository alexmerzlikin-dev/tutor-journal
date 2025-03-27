"use client";
import { useLessonsStore } from "@/store/lessons";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useTutorStore } from "@/store/tutor";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormLabel, FormItem, FormControl } from "./ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  id: string;
}

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Минимальная длинна поля 1",
  }),
});

export function Lesson({ id }: Props) {
  const { lessons } = useLessonsStore();
  const { students } = useTutorStore();
  const [lesson, setLesson] = useState<(typeof lessons)[0]>();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const res = await fetch(`/api/lessons/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({
        message: formData.message,
        userId: session?.user.id,
      }),
    });
    const data = await res.json();

    setLesson(data.lesson);
  };

  useEffect(() => {
    const l = lessons.find((lesson) => lesson.id === id);
    setLesson(l);
  }, []);

  if (!lesson) {
    return null;
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Журнал</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Занятие</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{lesson.subject}</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{lesson.topic}</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {students.find((student) => {
              if (student.id === lesson.studentId) {
                return student;
              }
            })?.user.realName || ""}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-wrap gap-5 w-full h-full">
        <div className="w-[50%] h-[60%] border-1 border-blue-200 rounded-xl shadow-xl">
          <h1 className="h-[5%] text-lg text-center bg-blue-100 rounded-t-xl">
            Чат занятия
          </h1>
          <div className="h-[80%] flex flex-col p-5 gap-5">
            {lesson.comments.map((comment) => {
              if (comment.userId === session?.user.id) {
                return (
                  <div className="self-end p-2 bg-blue-900 rounded-xl text-white">
                    {comment.message}
                  </div>
                );
              }

              return (
                <div className="w-max p-2 bg-blue-600 rounded-xl text-white">
                  {comment.message}
                </div>
              );
            })}
          </div>
          <Form {...form}>
            <form
              className="h-[15%] rounded-b-xl bg-blue-100 grid "
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Отправить</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
