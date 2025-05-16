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

  return (
    <div
      className="w-full bg-white border-t border-gray-200"
      {...touchHandlers}
    >
      {/* 탭 */}
      <div className="flex bg-[#f1f4f8]">
        <button
          onClick={() => {
            setTab("recent");
            setPage(0);
          }}
          className={`w-1/2 py-2 text-sm font-semibold border-b-2 ${
            tab === "recent"
              ? "border-[#29367c] text-[#29367c]"
              : "border-transparent text-[#555555]"
          }`}
        >
          최근방문
        </button>
        <button
          onClick={() => {
            setTab("favorite");
            setPage(0);
          }}
          className={`w-1/2 py-2 text-sm font-semibold border-b-2 ${
            tab === "favorite"
              ? "border-[#29367c] text-[#29367c]"
              : "border-transparent text-[#555555]"
          }`}
        >
          즐겨찾기
        </button>
      </div>

      {/* 갤러리 목록 */}
      <div className="grid grid-cols-2 text-sm text-gray-700">
        {[
          ...pagedList,
          ...Array(itemsPerPage - pagedList.length).fill(null),
        ].map((name, idx) => (
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
                  className="w-4 h-4 opacity-70"
                />
              </>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        ))}
      </div>

      {/* 페이지 동그라미 + 닫기 버튼 */}
      <div className="flex justify-between items-center py-3 px-2">
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
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
