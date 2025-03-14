import { NewStudentForm } from "@/components/new-student-form";
import { TutorStudents } from "@/components/tutor-students";

export default function StudentsPage() {
  return (
    <div className="flex flex-wrap gap-5">
      <NewStudentForm />
      <TutorStudents />
    </div>
  );
}
