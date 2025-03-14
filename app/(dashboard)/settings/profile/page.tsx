import { ProfileUser } from "@/components/profile-user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UpdateProfileForm } from "@/components/update-profile-form";

export default function ProfileSettingsPage() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Настройки</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Профиль</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-wrap gap-5">
        <ProfileUser />
        <UpdateProfileForm />
      </div>
    </>
  );
}
