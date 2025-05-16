import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../lib/actions";

export default function ProfileForm() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    userid: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.nickname,
        userid: user.userid,
        password: user.userpassword,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = () => {
    if (isEditing && user) {
      setFormData({
        name: user.nickname,
        userid: user.userid,
        password: user.userpassword,
      });
    }
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      alert("프로필이 수정되었습니다.");
      setIsEditing(false);
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="text-center py-10">로그인이 필요합니다.</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 mb-10 p-6 border rounded shadow"
    >
      <div className="flex justify-between mb-6">
        <div className="text-2xl font-semibold">프로필</div>
        <button
          type="button"
          onClick={handleToggleEdit}
          className="text-sm px-4 py-2 bg-[#3b4890] text-white rounded hover:bg-[#2f3a70]"
        >
          {isEditing ? "취소" : "프로필 수정"}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 text-sm mb-1">이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 border rounded ${
              isEditing ? "bg-white" : "bg-gray-50 text-gray-500"
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">아이디</label>
          <input
            type="text"
            name="userid"
            value={formData.userid}
            readOnly 
            className="w-full px-3 py-2 border rounded bg-gray-50 text-gray-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 border rounded ${
              isEditing ? "bg-white" : "bg-gray-50 text-gray-500"
            }`}
          />
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 text-right">
          <button
            type="submit"
            disabled={loading}
            className="text-sm px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {loading ? "수정 중..." : "수정 완료"}
          </button>
        </div>
      )}
    </form>
  );
}
