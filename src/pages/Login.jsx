import AuthForm from "../ui/login/AuthForm";
import Checkbox from "../ui/login/Checkbox";
import Links from "../ui/login/Links";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Login() {
  const location = useLocation();
  const from = location.state?.from || "/";
  const { login, isLogin } = useAuth();
  const navigate = useNavigate();

  // state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLogin) {
      navigate(from, { replace: true });
    }
  }, [isLogin, navigate, from]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await login(formData, from);
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
    <div className="flex flex-col justify-center px-2.5 pt-10 pb-5 max-w-7xl mx-auto">
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
