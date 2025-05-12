import AuthForm from "../ui/login/AuthForm";
import { handleSignup } from "../lib/actions";
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    handleSignup(formData, navigate);
  };

  return (
    <div className="flex flex-col justify-center px-2.5 py-10">
      <AuthForm onSubmit={handleSubmit} buttonLabel="회원가입" showNickname />
    </div>
  );
}
