import RequireLogin from "../ui/RequireLogin";

export default function Profile() {
  return (
    <RequireLogin>
      <h1>프로필</h1>
    </RequireLogin>
  );
}
