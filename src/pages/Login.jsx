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
    } catch (error) {
      console.error(error);
      const data = error.response?.data || {};
      setError({
        userid: data.userid || null,
        password: data.password || null,
        message: data.message || null,
      });
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
          error={error}
        />
      </div>
      <Checkbox />
      <Links />
    </div>
  );
}
