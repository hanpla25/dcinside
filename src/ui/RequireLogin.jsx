import { useAuth } from "../context/AuthContext";

export default function RequireLogin({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center py-10">로그인이 필요합니다.</div>;
  }

  return children;
}
