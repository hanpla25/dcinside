import axios from "axios";
import AuthForm from "../ui/login/AuthForm";

export default function Signup() {
  const handleSignup = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/api/signup", data);
      console.log("회원가입 성공:", res.data);
      // 회원가입 후 처리
    } catch (err) {
      console.error("회원가입 실패:", err);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <AuthForm onSubmit={handleSignup} buttonLabel="회원가입" showNickname />
    </div>
  );
}
