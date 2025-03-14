"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Command } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  realName: z.string().min(1, {
    message: "Обязательное поле",
  }),
  role: z.string().min(1, {
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

const GuestPage = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      realName: "",
      role: "",
      city: "",
      country: "",
      timeZone: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    await fetch("/api/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        email: session?.user.email,
        ...formData,
      }),
    });
    await update(formData);
    router.push("/");
  };

  useEffect(() => {
    if (session?.user.role) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Command className="size-4" />
          </div>
          Журнал Репетитора
        </h1>
      </div>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Здравствуйте, {session?.user.name} </CardTitle>
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

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваша роль</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите Вашу роль" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Роли</SelectLabel>
                            <SelectItem value="tutor">Репетитор</SelectItem>
                            <SelectItem value="student">Ученик</SelectItem>
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
              <CardDescription>
                Вы всегда сможете изменить имя и роль в настройках профиля
              </CardDescription>
              <Button className="self-end" type="submit">
                Продолжить
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default GuestPage;
