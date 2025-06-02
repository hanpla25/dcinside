import { useState } from "react";
import { recentList, favoriteList } from "../lib/placeholder-data";
import { createTouchSwipeHandlers } from "../lib/utils";

export default function NavRecent({ onClose }) {
  const [tab, setTab] = useState("recent");
  const [page, setPage] = useState(0);

  const itemsPerPage = 8;
  const fullList = tab === "recent" ? recentList : favoriteList;
  const totalPages = Math.ceil(fullList.length / itemsPerPage);
  const pagedList = fullList.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const touchHandlers = createTouchSwipeHandlers({
    onSwipeLeft: () => setPage((prev) => Math.min(prev + 1, totalPages - 1)),
    onSwipeRight: () => setPage((prev) => Math.max(prev - 1, 0)),
  });

  const handleTabChange = (type) => {
    setTab(type);
    setPage(0);
  };

  return (
    <div
      className="w-full bg-white border-t border-gray-200 max-w-7xl mx-auto"
      {...touchHandlers}
    >
      {/* 탭 */}
      <div className="flex bg-[#f1f4f8]">
        {["recent", "favorite"].map((type) => (
          <button
            key={type}
            onClick={() => handleTabChange(type)}
            className={`w-1/2 py-2 text-sm font-semibold border-b-2 ${
              tab === type
                ? "border-[#29367c] text-[#29367c]"
                : "border-transparent text-[#555555]"
            }`}
          >
            {type === "recent" ? "최근방문" : "즐겨찾기"}
          </button>
        ))}
      </div>

      {/* 목록 */}
      <div className="grid grid-cols-2 text-sm text-gray-700">
        {Array.from({ length: itemsPerPage }).map((_, idx) => {
          const name = pagedList[idx];
          return (
            <div
              key={idx}
              className="flex items-center justify-between pl-4 pr-2 py-2 border-b border-gray-300"
            >
              {name ? (
                <>
                  <span className="truncate">{name}</span>
                  <img
                    src="/x_button.png"
                    alt="삭제"
                    className="w-4 h-4 opacity-70 cursor-pointer"
                    onClick={() => {
                      // TODO: 삭제 로직 구현
                      console.log("삭제 클릭:", name);
                    }}
                  />
                </>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
          );
        })}
      </div>

      {/* 페이지네이션 & 닫기 버튼 */}
      <div className="flex justify-between items-center py-3 px-2">
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx)}
              aria-label={`페이지 ${idx + 1}`}
              className={`w-3 h-3 rounded-full ${
                page === idx ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          닫기
        </button>
      </div>
    </div>
  );
}
