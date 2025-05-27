import { useState } from "react";
import { Link } from "react-router";
import NavRecent from "./NavRecent";

export default function Header() {
  const [showRecent, setShowRecent] = useState(false);

  const toggleRecent = () => setShowRecent((prev) => !prev);
  const closeRecent = () => setShowRecent(false);

  return (
    <>
      <header className="flex items-center bg-[#29367c] py-2 px-2">
        <Link to="/" className="flex items-center">
          <img
            src="/left_logo.png"
            alt="로고"
            className=""
            width={34}
            height={26}
          />
        </Link>

        <form className="flex flex-1 items-center justify-between bg-white ml-2 py-1.5">
          <div className="px-2 flex items-center h-full">
            <img
              src="/header_btn.png"
              alt="메뉴 버튼"
              className=""
              width={20}
              height={16}
            />
          </div>
          <input
            type="text"
            placeholder="갤러리 & 통합검색"
            aria-label="갤러리 및 통합검색"
            className="flex-1 w-full px-2 py-1 text-sm border-x border-gray-200 focus:outline-none"
          />
          <div className="px-2 flex items-center h-full">
            <img
              src="/header_search.png"
              alt="검색"
              className=""
              width={20}
              height={22}
            />
          </div>
          <button
            type="button"
            onClick={toggleRecent}
            className="h-full text-sm px-1.5"
          >
            최근 방문
          </button>
        </form>
      </header>

      {showRecent && (
        <div className="w-full bg-white border-b border-gray-200">
          <NavRecent onClose={closeRecent} />
        </div>
      )}
    </>
  );
}
