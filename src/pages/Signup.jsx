import AuthForm from "../ui/login/AuthForm";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  // state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await signup(formData);
      alert("회원가입 성공!");
      navigate("/login");
    } catch (err) {
      console.error(err);
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
