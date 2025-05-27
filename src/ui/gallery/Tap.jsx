import { useState } from "react";

export default function Tap() {
  const [tap, setTap] = useState("전체글");
  const tabs = ["전체글", "개념글", "공지"];

  return (
    <div className="flex items-center border-b border-gray-200">
      {tabs.map((label) => (
        <button
          key={label}
          onClick={() => setTap(label)}
          className={`flex-1 px-2 py-2 text-center text-sm font-medium 
            ${
              tap === label
                ? "border-b-2 border-[#3b4890] text-[#3b4890]"
                : "text-gray-600"
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
