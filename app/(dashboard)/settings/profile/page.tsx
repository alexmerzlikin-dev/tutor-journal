import { ProfileUser } from "@/components/profile-user";
import { UpdateProfileForm } from "@/components/update-profile-form";

export default function ProfileSettingsPage() {
  return (
    <div className="flex flex-wrap gap-5">
      <ProfileUser />
      <UpdateProfileForm />
    </div>
  );
}
