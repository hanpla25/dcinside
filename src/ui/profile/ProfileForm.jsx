import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { updateProfile } from "../../lib/actions";
import { useNavigate } from "react-router";

export default function ProfileForm({ isEdit }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    prevPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await updateProfile({
        userid: user.userid,
        password: formData.prevPassword,
        name: user.nickname,
        nextpassword: formData.newPassword,
      });
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/");
    } catch (error) {
      const res = error?.response?.data;

      setErrors(res || {});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-5 mb-10"
    >
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          이름
        </label>
        <input
          type="text"
          value={user.nickname}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          아이디
        </label>
        <input
          type="text"
          value={user.userid}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
        />
      </div>

      <div>
        <label
          htmlFor="prevPassword"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          이전 비밀번호
        </label>
        <input
          id="prevPassword"
          name="prevPassword"
          type="password"
          value={formData.prevPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring ${
            errors.password ? "focus:ring-red-300" : "focus:ring-blue-300"
          }`}
          disabled={!isEdit}
          required
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          새로운 비밀번호
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.newPassword ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring ${
            errors.newPassword ? "focus:ring-red-300" : "focus:ring-blue-300"
          }`}
          disabled={!isEdit}
          required
        />
        {errors.newPassword && (
          <p className="text-sm text-red-500 mt-1">{errors.newPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isEdit}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        변경
      </button>
    </form>
  );
}
