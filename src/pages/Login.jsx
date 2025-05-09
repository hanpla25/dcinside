import axios from "axios";
import AuthForm from "../ui/login/AuthForm";
import Checkbox from "../ui/login/Checkbox";
import Links from "../ui/login/Links";

export default function Login() {
  const handleLogin = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/api/login", data);
      console.log("로그인 성공:", res.data);
    } catch (err) {
      console.error("로그인 실패:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center py-10">
      <AuthForm onSubmit={handleLogin} buttonLabel="로그인" />
      <Checkbox />
      <Links />
    </div>
  );
}
