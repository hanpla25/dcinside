import AuthForm from "../ui/login/AuthForm";
import { handleSignup } from "../lib/actions";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (formData) => {
    try {
      await handleSignup(formData, navigate);
      await login();
    } catch (error) {}
  };

  return (
    <div className="flex flex-col justify-center px-2.5 py-10">
      <AuthForm onSubmit={handleSubmit} buttonLabel="회원가입" showNickname />
    </div>
  );
}
