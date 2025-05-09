import { useState } from "react";

export default function NavRecent({ onClose }) {
  const [tab, setTab] = useState("recent");
  const [page, setPage] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const recentList = [
    "연예갤러리",
    "게임갤러리",
    "정치갤러리",
    "스포츠갤러리",
    "자동차갤러리",
    "음악갤러리",
    "영화갤러리",
    "웹툰갤러리",
    "디자인갤러리",
    "기타갤러리",
    "자동차갤러리",
    "음악갤러리",
    "영화갤러리",
    "웹툰갤러리",
    "디자인갤러리",
    "기타갤러리",
    "자동차갤러리",
    "음악갤러리",
    "영화갤러리",
    "웹툰갤러리",
    "디자인갤러리",
    "기타갤러리",
  ];

  const itemsPerPage = 8;
  const favoriteList = ["디자인갤러리", "음식갤러리"];

  const fullList = tab === "recent" ? recentList : favoriteList;
  const totalPages = Math.ceil(fullList.length / itemsPerPage);
  const pagedList = fullList.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  // 터치 이벤트 핸들러
  const handleTouchStart = (e) => {
    setIsTouching(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isTouching) return;
    setDragOffset(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (isTouching) {
      const direction = dragOffset > 50 ? -1 : dragOffset < -50 ? 1 : 0;
      if (direction !== 0) {
        setPage((prevPage) =>
          Math.min(Math.max(prevPage + direction, 0), totalPages - 1)
        );
      }
      setIsTouching(false);
      setDragOffset(0);
    }
  };

  return (
    <div
      className="w-full bg-white border-t border-gray-200"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
        {/* 페이지 동그라미 버튼 */}
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

        {/* 닫기 버튼 */}
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          닫기
        </button>
      </div>
    </div>
  );
}
