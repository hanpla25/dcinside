import AuthForm from "../ui/login/AuthForm";
import Checkbox from "../ui/login/Checkbox";
import Links from "../ui/login/Links";
import { handleLogin } from "../lib/actions";

export default function Login() {
  return (
    <div className="flex flex-col justify-center px-2.5 py-10">
      <div className="self-center w-full">
        <AuthForm onSubmit={handleLogin} buttonLabel="로그인" />
      </div>
      <Checkbox />
      <Links />
    </div>
  );
}
