import { useState } from "react";

export default function AuthForm({
  onSubmit,
  buttonLabel = "확인",
  showNickname = false,
  error = {},
}) {
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    nickname: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userid, password, nickname } = formData;
    const dataToSubmit = showNickname
      ? { userid, password, nickname }
      : { userid, password };
    onSubmit(dataToSubmit);
  };

  // 인풋 스타일
  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4890]";
  const renderError = (fieldError) => (
    <div className="text-xs text-red-600 px-2 py-2 min-h-[1.5rem]">
      {fieldError || "\u00A0"}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {showNickname && (
        <>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleInputChange}
            className={inputClass}
          />
          {renderError(error?.nickname || error?.message)}
        </>
      )}

      <input
        id="userid"
        type="text"
        name="userid"
        placeholder="아이디"
        value={formData.userid}
        onChange={handleInputChange}
        className={inputClass}
      />
      {renderError(error?.userid || error?.message)}

      <input
        id="password"
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleInputChange}
        className={inputClass}
      />
      {renderError(error?.password || error?.message)}

      <button
        type="submit"
        className="w-full bg-[#3b4890] text-white py-2 rounded-md hover:bg-[#2f3a70] transition"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
