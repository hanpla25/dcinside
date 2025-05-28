import { useSearchParams } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function Tap({ size, sizes, setSearchParams }) {
  const [searchParams] = useSearchParams();
  const recomend = searchParams.get("recomend");
  const notice = searchParams.get("notice");
  const tabs = ["전체글", "개념글", "공지"];
  const tab = notice === "1" ? "공지" : recomend === "1" ? "개념글" : "전체글";

  const dropdownRef = useRef();
  const [showSizeOptions, setShowSizeOptions] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSizeOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (label) => {
    if (label === "개념글") {
      setSearchParams({ recomend: "1" });
    } else if (label === "공지") {
      setSearchParams({ notice: "1" });
    } else {
      setSearchParams({});
    }
  };

  const handleSizeClick = (newSize) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.set("size", String(newSize));
      nextParams.set("page", "1");
      return nextParams;
    });
    setShowSizeOptions(false);
  };

  return (
    <div className="flex items-center border-b border-gray-200 relative">
      {tabs.map((label) => (
        <button
          key={label}
          onClick={() => handleClick(label)}
          className={`flex-1 px-2 py-2 text-center text-sm font-medium ${
            tab === label
              ? "border-b-2 border-[#3b4890] text-[#3b4890]"
              : "text-gray-600"
          }`}
        >
          {label}
        </button>
      ))}

      <div ref={dropdownRef} className="relative flex-1 text-center">
        <button
          onClick={() => setShowSizeOptions((prev) => !prev)}
          className="px-2 py-2 text-sm font-medium inline-flex items-center justify-center w-full"
          type="button"
        >
          <span className="pr-2">{size}개</span>
          <span className="text-gray-400">▼</span>
        </button>

        {showSizeOptions && (
          <ul className="absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded bg-white z-10">
            {sizes.map((s) => (
              <li
                key={s}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                  s === size ? "font-bold text-blue-600" : ""
                }`}
                onClick={() => handleSizeClick(s)}
              >
                {s}개
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
