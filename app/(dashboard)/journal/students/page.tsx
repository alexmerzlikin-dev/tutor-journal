import { NewStudentForm } from "@/components/new-student-form";
import { TutorStudents } from "@/components/tutor-students";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function StudentsPage() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Журнал</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Ученики</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-wrap gap-5">
        <NewStudentForm />
        <TutorStudents />
      </div>
    </>
  );
}
