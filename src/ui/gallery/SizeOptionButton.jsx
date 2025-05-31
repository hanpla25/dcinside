import { useRef, useState } from "react";
import { useSearchParams } from "react-router";

export default function SizeOptionButton({}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sizes = [1, 20, 30, 50];
  const size = parseInt(searchParams.get("size") || "20", 10);
  const dropdownRef = useRef();
  const [showSizeOptions, setShowSizeOptions] = useState(false);

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
    <div ref={dropdownRef} className="relative text-center">
      <button
        onClick={() => setShowSizeOptions((prev) => !prev)}
        className="px-3 py-1 text-sm font-medium inline-flex items-center justify-center"
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
  );
}
