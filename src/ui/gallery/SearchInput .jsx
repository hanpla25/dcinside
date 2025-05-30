import { useState } from "react";

export default function SearchInput({ search, setSearchParams }) {
  const [keyword, setKeyword] = useState(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (keyword) next.set("search", keyword);
      else next.delete("search");
      next.set("page", 1);
      return next;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="my-2 flex gap-2">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="border px-2 py-1 w-full flex-1"
      />
      <button type="submit" className="px-3 py-1 bg-blue-500 text-white">
        검색
      </button>
    </form>
  );
}
