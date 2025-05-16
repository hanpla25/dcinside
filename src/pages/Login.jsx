import AuthForm from "../ui/login/AuthForm";
import Checkbox from "../ui/login/Checkbox";
import Links from "../ui/login/Links";
import { handleLogin } from "../lib/actions";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      await handleLogin(formData, navigate);
      await login();
    } catch (err) {
      console.log(err);
      setError("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center px-2.5 py-10">
      <div className="self-center w-full">
        <AuthForm
          onSubmit={handleSubmit}
          buttonLabel={loading ? "로그인 중..." : "로그인"}
          disabled={loading}
        />
      </div>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      <Checkbox />
      <Links />
    </div>
  );
}
