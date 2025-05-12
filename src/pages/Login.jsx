import AuthForm from "../ui/login/AuthForm";
import Checkbox from "../ui/login/Checkbox";
import Links from "../ui/login/Links";
import { handleLogin } from "../lib/actions";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    handleLogin(formData, navigate);
  };
  return (
    <div className="flex flex-col justify-center px-2.5 py-10">
      <div className="self-center w-full">
        <AuthForm onSubmit={handleSubmit} buttonLabel="로그인" />
      </div>
      <Checkbox />
      <Links />
    </div>
  );
}
