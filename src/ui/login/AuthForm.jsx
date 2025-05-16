import { useState } from "react";

export default function AuthForm({
  onSubmit,
  buttonLabel = "확인",
  showNickname = false,
  error = null, // 에러 메시지를 props로 받음
  disabled = false,
}) {
  const [formData, setFormData] = useState({
    userid: "",
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
    <form onSubmit={handleSubmit} className="w-full">
      {showNickname && (
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4890] mb-8"
        />
      )}
      <label htmlFor="userid" className="sr-only">
        아이디
      </label>
      <input
        id="userid"
        type="text"
        name="userid"
        placeholder="아이디"
        value={formData.userid}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4890]"
      />
      <div className="text-xs text-red-600 px-2 py-2 min-h-[1.5rem]">
        {error?.userid || "\u00A0"}
      </div>
      <label htmlFor="password" className="sr-only">
        비밀번호
      </label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4890]"
      />
      <div className="text-xs text-red-600 px-2 py-2 min-h-[1.5rem]">
        {error?.password || "\u00A0"}
      </div>
      <button
        type="submit"
        className="w-full bg-[#3b4890] text-white py-2 rounded-md hover:bg-[#2f3a70] transition"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
