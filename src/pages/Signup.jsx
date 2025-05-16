import AuthForm from "../ui/login/AuthForm";
import { handleSignup } from "../lib/actions";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await handleSignup(formData, navigate);
      await login();
    } catch (err) {
      console.error(err);

      // 개별 필드 에러 메시지 추출
      const data = err.response?.data || {};
      setError({
        userid: data.userid || null,
        password: data.password || null,
        nickname: data.nickname || null,
        message: data.message || null,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center px-2.5 py-10">
      <AuthForm
        onSubmit={handleSubmit}
        buttonLabel={loading ? "가입 중..." : "회원가입"}
        showNickname
        disabled={loading}
        error={error}
      />
    </div>
  );
}
