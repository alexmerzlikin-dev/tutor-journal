import { Lessons } from "@/components/lessons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function LessonsPage() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Журнал</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Занятия</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-wrap gap-5">
        <Lessons />
      </div>
    </>
  );
}
