"use client";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTutorStore } from "@/store/tutor";

const formSchema = z.object({
  email: z.string().email({
    message: "Не правильный формат почты",
  }),
});

export function NewStudentForm() {
  const { data: session } = useSession();
  const { newStudentByEmail } = useTutorStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    await newStudentByEmail(session?.user.id || "", formData.email);
  };

  return (
    <Card className="w-full md:w-[320px] h-max">
      <CardHeader>
        <CardTitle>Добавить нового ученика</CardTitle>
        <CardDescription>
          Узнайте email у ученика, чтобы добавить его
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>@email</FormLabel>
                  <FormControl>
                    <Input placeholder="Почта ученика" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="self-end" type="submit">
              Добавить
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
