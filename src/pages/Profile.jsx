import ProfileForm from "../ui/profile/ProfileForm";
import Button from "../ui/profile/Button";
import RequireLogin from "../ui/RequireLogin";

export default function Profile() {
  return (
    <RequireLogin>
      <div className="max-w-xl mx-auto">
        <ProfileForm />
        <div className="flex justify-end mt-4">
          <Button />
        </div>
      </div>
    </RequireLogin>
  );
}
