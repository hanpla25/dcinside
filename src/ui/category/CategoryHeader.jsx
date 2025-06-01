import { Link } from "react-router";

export default function CategoryHeader() {
  return (
    <div className="flex justify-between text-xl font-semibold p-2 border-b border-gray-300">
      <span>전체 갤러리</span>
      <Link to="/create">
        <button className="text-sm border text-[#3b4890] border-[#3b4890] rounded-full px-3 py-1">
          갤러리 생성
        </button>
      </Link>
    </div>
  );
}
