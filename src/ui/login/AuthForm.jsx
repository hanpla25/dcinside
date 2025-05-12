import { useState } from "react";

export default function AuthForm({
  onSubmit,
  buttonLabel = "확인",
  showNickname = false,
}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nickname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };
    if (!showNickname) delete dataToSubmit.nickname;
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {showNickname && (
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4890]"
        />
      )}
      <input
        type="text"
        name="username"
        placeholder="아이디"
        value={formData.username}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4890]"
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4890]"
      />
      <button
        type="submit"
        className="w-full bg-[#3b4890] text-white py-2 rounded-md hover:bg-[#2f3a70] transition"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
