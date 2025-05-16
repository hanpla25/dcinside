import { useAuth } from "../context/AuthContext";

export default function RequireLogin({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  if (!user) {
    return <div className="text-center py-10">로그인이 필요합니다.</div>;
  }

  return children;
}
