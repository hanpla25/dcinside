import { useState } from "react";
import { Link } from "react-router";
import NavRecent from "./NavRecent";

export default function Header() {
  const [showRecent, setShowRecent] = useState(false);

  const toggleRecent = () => setShowRecent((prev) => !prev);
  const closeRecent = () => setShowRecent(false);

  return (
    <>
      <header className="bg-[#29367c] flex items-center justify-between px-2 py-2.5">
        {/* 왼쪽 로고 */}
        <Link to="/">
          <img src="/left_logo.png" alt="로고" className="mr-1" />
        </Link>

        {/* 검색창 및 버튼들 */}
        <div className="flex flex-1 bg-white items-center border border-gray-200 rounded">
          <div className="px-2 border-gray-200">
            <img src="/header_btn.png" alt="메뉴 버튼" />
          </div>

          <input
            type="text"
            placeholder="갤러리 & 통합검색"
            aria-label="갤러리 및 통합검색"
            className="flex-1 px-2 py-1 font-light border-l border-gray-200 focus:outline-none"
          />

          <div className="px-2 border-r border-gray-200">
            <img src="/header_search.png" alt="검색" />
          </div>

          <button
            type="button"
            onClick={toggleRecent}
            className="px-2 text-sm font-medium"
          >
            최근 방문
          </button>
        </div>
      </header>

      {showRecent && (
        <div className="w-full bg-white border-b border-gray-200">
          <NavRecent onClose={closeRecent} />
        </div>
      )}
    </>
  );
}
