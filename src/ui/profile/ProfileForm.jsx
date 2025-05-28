import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../lib/actions";
import { useNavigate } from "react-router";

export default function ProfileForm() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    userid: "",
    password: "",
    nextpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (user) resetForm();
  }, [user]);

  const resetForm = () => {
    setFormData({
      name: user?.nickname ?? "",
      userid: user?.userid ?? "",
      password: "",
      nextpassword: "",
    });
    setError({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = () => {
    if (isEditing) resetForm();
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    try {
      await updateProfile(formData);
      alert("프로필이 수정되었습니다.");
      setIsEditing(false);
    } catch (error) {
      console.error("수정 실패:", error);
      const data = error.response?.data || {};
      setError({
        userid: data.userid || null,
        message: data.message || null,
        prevpassword: data.password || null,
        nextpassword: data.newPassword || null,
      });
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  // 스타일 통합
  const inputClass = (editable) =>
    `w-full px-3 py-2 border rounded ${
      editable ? "bg-white" : "bg-gray-50 text-gray-500"
    }`;

  const renderInput = (
    label,
    name,
    type = "text",
    readOnly = false,
    errorMsg = ""
  ) => (
    <div>
      <label className="block text-gray-600 text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        readOnly={readOnly}
        className={inputClass(!readOnly)}
        autoComplete="off"
      />
      <div className="text-xs text-red-600 px-2 py-2 min-h-[1.5rem]">
        {errorMsg || "\u00A0"}
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 mb-10 p-6 border rounded shadow"
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

      <div>
        {renderInput("아이디", "userid", "text", true, error?.userid)}
        {renderInput("이름", "name", "text", !isEditing, error?.message)}
        {isEditing &&
          renderInput(
            "이전 비밀번호",
            "password",
            "password",
            false,
            error?.prevpassword
          )}
        {isEditing &&
          renderInput(
            "새로운 비밀번호",
            "nextpassword",
            "password",
            false,
            error?.nextpassword
          )}
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
