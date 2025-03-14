"use client";
import { useLessonsStore } from "@/store/lessons";
import { useTutorStore } from "@/store/tutor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "./ui/button";

interface Props {
  lessonDate: Date;
}

const formSchema = z.object({
  studentId: z.string().min(1, {
    message: "Обязательное поле!",
  }),
  subject: z.string().min(1, {
    message: "Обязательное поле!",
  }),
  topic: z.string().min(1, {
    message: "Обязательное поле!",
  }),
  startTime: z.string().min(1, {
    message: "Обязательное поле!",
  }),
  endTime: z.string().min(1, {
    message: "Обязательное поле!",
  }),
});

export function NewLessonForm({ lessonDate }: Props) {
  const { data: session } = useSession();
  const { students } = useTutorStore();
  const { postLesson, getLessons } = useLessonsStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      subject: "",
      topic: "",
      startTime: "07:00",
      endTime: "08:00",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const lesson = {
      ...formData,
      date: lessonDate,
      tutorId: session?.user.id || "",
    };

    await postLesson(lesson);
    const query = {
      userId: session?.user.id || "",
      date: lessonDate,
      role: session?.user.role || "",
    };
    await getLessons(query);
  };

  if (session?.user.role === "student") {
    return null;
  }

  return (
    <Card className="w-full md:w-[320px] h-max">
      <CardHeader>
        <CardTitle>Создание занятия</CardTitle>
        <CardDescription>
          Выбери день в календаре на который создать занятие
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Предмет занятия</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тема занятия</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Начало занятия hh:mm</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={`${field.value}`}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Время Часы:Минуты" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="00:00">00:00</SelectItem>
                          <SelectItem value="00:30">00:30</SelectItem>
                          <SelectItem value="01:00">01:00</SelectItem>
                          <SelectItem value="01:30">01:30</SelectItem>
                          <SelectItem value="02:00">02:00</SelectItem>
                          <SelectItem value="02:30">02:30</SelectItem>
                          <SelectItem value="03:00">03:00</SelectItem>
                          <SelectItem value="03:30">03:30</SelectItem>
                          <SelectItem value="04:00">04:00</SelectItem>
                          <SelectItem value="04:30">04:30</SelectItem>
                          <SelectItem value="05:00">05:00</SelectItem>
                          <SelectItem value="05:30">05:30</SelectItem>
                          <SelectItem value="06:00">06:00</SelectItem>
                          <SelectItem value="06:30">06:30</SelectItem>
                          <SelectItem value="07:00">07:00</SelectItem>
                          <SelectItem value="07:30">07:30</SelectItem>
                          <SelectItem value="08:00">08:00</SelectItem>
                          <SelectItem value="08:30">08:30</SelectItem>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="09:30">09:30</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="10:30">10:30</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="11:30">11:30</SelectItem>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="12:30">12:30</SelectItem>
                          <SelectItem value="13:00">13:00</SelectItem>
                          <SelectItem value="13:30">13:30</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="14:30">14:30</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="15:30">15:30</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="16:30">16:30</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
                          <SelectItem value="17:30">17:30</SelectItem>
                          <SelectItem value="18:00">18:00</SelectItem>
                          <SelectItem value="18:30">18:30</SelectItem>
                          <SelectItem value="19:00">19:00</SelectItem>
                          <SelectItem value="19:30">19:30</SelectItem>
                          <SelectItem value="20:00">20:00</SelectItem>
                          <SelectItem value="20:30">20:30</SelectItem>
                          <SelectItem value="21:00">21:00</SelectItem>
                          <SelectItem value="21:30">21:30</SelectItem>
                          <SelectItem value="22:00">22:00</SelectItem>
                          <SelectItem value="22:30">22:30</SelectItem>
                          <SelectItem value="23:00">23:00</SelectItem>
                          <SelectItem value="23:30">23:30</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Конец занятия hh:mm</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={`${field.value}`}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Время Часы:Минуты" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="00:00">00:00</SelectItem>
                          <SelectItem value="00:30">00:30</SelectItem>
                          <SelectItem value="01:00">01:00</SelectItem>
                          <SelectItem value="01:30">01:30</SelectItem>
                          <SelectItem value="02:00">02:00</SelectItem>
                          <SelectItem value="02:30">02:30</SelectItem>
                          <SelectItem value="03:00">03:00</SelectItem>
                          <SelectItem value="03:30">03:30</SelectItem>
                          <SelectItem value="04:00">04:00</SelectItem>
                          <SelectItem value="04:30">04:30</SelectItem>
                          <SelectItem value="05:00">05:00</SelectItem>
                          <SelectItem value="05:30">05:30</SelectItem>
                          <SelectItem value="06:00">06:00</SelectItem>
                          <SelectItem value="06:30">06:30</SelectItem>
                          <SelectItem value="07:00">07:00</SelectItem>
                          <SelectItem value="07:30">07:30</SelectItem>
                          <SelectItem value="08:00">08:00</SelectItem>
                          <SelectItem value="08:30">08:30</SelectItem>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="09:30">09:30</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="10:30">10:30</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="11:30">11:30</SelectItem>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="12:30">12:30</SelectItem>
                          <SelectItem value="13:00">13:00</SelectItem>
                          <SelectItem value="13:30">13:30</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="14:30">14:30</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="15:30">15:30</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="16:30">16:30</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
                          <SelectItem value="17:30">17:30</SelectItem>
                          <SelectItem value="18:00">18:00</SelectItem>
                          <SelectItem value="18:30">18:30</SelectItem>
                          <SelectItem value="19:00">19:00</SelectItem>
                          <SelectItem value="19:30">19:30</SelectItem>
                          <SelectItem value="20:00">20:00</SelectItem>
                          <SelectItem value="20:30">20:30</SelectItem>
                          <SelectItem value="21:00">21:00</SelectItem>
                          <SelectItem value="21:30">21:30</SelectItem>
                          <SelectItem value="22:00">22:00</SelectItem>
                          <SelectItem value="22:30">22:30</SelectItem>
                          <SelectItem value="23:00">23:00</SelectItem>
                          <SelectItem value="23:30">23:30</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Выбери ученика</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={`${field.value}`}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ученики" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {students.map((student) => {
                            return (
                              <SelectItem
                                key={student.user.id}
                                value={student.user.id}
                              >
                                {student.user.realName}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="self-end" type="submit">
              Создать
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
