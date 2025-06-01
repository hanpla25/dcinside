import { useState } from "react";
import ProfileForm from "../ui/profile/ProfileForm";
import ProfileHeader from "../ui/profile/ProfileHeader";
import RequireLogin from "../ui/RequireLogin";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="mx-auto max-w-7xl">
      <RequireLogin>
        <ProfileHeader isEdit={isEdit} setIsEdit={setIsEdit} />
        <ProfileForm isEdit={isEdit} />
      </RequireLogin>
    </div>
  );
}
