import { Lesson } from "@/components/lesson";

export default async function LessonsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Lesson id={id} />
    </>
  );
}
