import { useState } from "react";
import { Link } from "react-router";
import NavRecent from "./NavRecent";

export default function Header() {
  const [showRecent, setShowRecent] = useState(false);

  return (
    <div>
      <header className="bg-[#29367c] flex items-center justify-between px-2 py-2.5">
        {/* 왼쪽 로고 */}
        <Link to={"/"}>
          <img src="/left_logo.png" alt="로고" className="mr-1" />
        </Link>

        {/* 가운데 검색창과 버튼들 */}
        <div className="flex flex-1 bg-white items-center border border-gray-200 rounded">
          <div className="px-2 border-gray-200 shrink-0">
            <img src="/header_btn.png" alt="메뉴 버튼" />
          </div>

          <input
            type="text"
            placeholder="갤러리 & 통합검색"
            className="flex-1 px-2 py-1 font-light border-l border-gray-200 focus:outline-none min-w-0"
          />

          <div className="px-2 border-r border-gray-200 shrink-0">
            <img src="/header_search.png" alt="검색" />
          </div>

          {/* 최근 방문 버튼 */}
          <div
            onClick={() => setShowRecent((prev) => !prev)}
            className="px-2 text-sm font-medium shrink-0"
          >
            최근 방문
          </div>
        </div>
      </header>

      {/* 최근 방문 패널 */}
      {showRecent && (
        <div className="w-full bg-white border-b border-gray-200">
          <NavRecent onClose={() => setShowRecent(false)} />
        </div>
      )}
    </div>
  );
}
