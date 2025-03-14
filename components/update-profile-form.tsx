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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  realName: z.string().min(1, {
    message: "Обязательное поле",
  }),
  city: z.string().min(1, {
    message: "Обязательное поле",
  }),
  country: z.string().min(1, {
    message: "Обязательное поле",
  }),
  timeZone: z.string().min(1, {
    message: "Обязательное поле",
  }),
});

export function UpdateProfileForm() {
  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      realName: session?.user.realName || "",
      city: session?.user.city || "",
      country: session?.user.country || "",
      timeZone: session?.user.timeZone || "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    await fetch("/api/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        ...formData,
        role: session?.user.role,
        email: session?.user.email,
      }),
    });
    await update({
      ...formData,
      role: session?.user.role,
      email: session?.user.email,
    });
  };
  return (
    <Card className="w-full md:w-[320px] h-max">
      <CardHeader>
        <CardTitle>Общая информация</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="realName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Как к Вам обращаться?</FormLabel>
                  <FormControl>
                    <Input placeholder="Томас Андерсон" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Город</FormLabel>
                  <FormControl>
                    <Input placeholder="Москва" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Страна</FormLabel>
                  <FormControl>
                    <Input placeholder="Россия" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeZone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваша временная зона</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Временная зона" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>По Москве</SelectLabel>
                          <SelectItem value="-6">-6</SelectItem>
                          <SelectItem value="-5">-5</SelectItem>
                          <SelectItem value="-4">-4</SelectItem>
                          <SelectItem value="-3">-3</SelectItem>
                          <SelectItem value="-2">-2</SelectItem>
                          <SelectItem value="-1">-1</SelectItem>
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                          <SelectItem value="+2">+2</SelectItem>
                          <SelectItem value="+3">+3</SelectItem>
                          <SelectItem value="+4">+4</SelectItem>
                          <SelectItem value="+5">+5</SelectItem>
                          <SelectItem value="+6">+6</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button className="self-end" type="submit">
              Сохранить
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
