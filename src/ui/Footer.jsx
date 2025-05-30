import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { isLogin, logout } = useAuth();
  return (
    <footer className="bg-[#3b4890] flex justify-center py-4 max-w-7xl mx-auto">
      {isLogin ? (
        <div className="w-11/12 flex justify-between gap-2">
          <Link
            to="/profile"
            className="flex-1 py-2 border border-gray-400 text-white rounded-md font-medium text-center"
          >
            프로필
          </Link>
          <button
            onClick={logout}
            className="flex-1 py-2 border border-gray-400 text-white rounded-md font-medium text-center"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="w-[100%] mx-2 py-2 border border-gray-400 text-white rounded-md font-medium text-center max-w-7xl"
        >
          로그인
        </Link>
      )}
    </footer>
  );
}
