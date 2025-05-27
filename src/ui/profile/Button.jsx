import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { resign } from "../../lib/actions";

export default function Button() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDelete = async () => {
    if (!window.confirm("정말로 탈퇴하시겠습니까?")) return;
    try {
      await resign();
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-sm px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 mb-4"
    >
      탈퇴
    </button>
  );
}
