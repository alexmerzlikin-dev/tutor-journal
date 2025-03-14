import { Lessons } from "@/components/lessons";
import { ProfileUser } from "@/components/profile-user";
import { StudentTutors } from "@/components/student-tutors";
import { TutorStudents } from "@/components/tutor-students";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";

export default function Page() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
        <BreadcrumbItem>Главная страница</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-5">
          <ProfileUser />
          <TutorStudents />
          <StudentTutors />
        </div>
        <Lessons />
      </div>
    </>
  );
}
