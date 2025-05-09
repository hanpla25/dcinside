import AuthForm from "../ui/login/AuthForm";
import { handleSignup } from "../lib/actions";

export default function Signup() {
  return (
    <div className="flex flex-col justify-center px-2.5 py-10">
      <AuthForm onSubmit={handleSignup} buttonLabel="회원가입" showNickname />
    </div>
  );
}
