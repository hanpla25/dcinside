import { Link } from "react-router";

export default function PostButtons({ category, postId }) {
  return (
    <div className="flex gap-2 px-2">
      <Link
        to={`/gallery/${category}`}
        className="flex-1 py-2 bg-white text-gray-500 border border-gray-300 rounded-md text-center"
      >
        목록보기
      </Link>
      <Link
        to={`/write/${category}`}
        className="flex-1 py-2 bg-[#3b4890] text-white rounded-md text-center"
      >
        글쓰기
      </Link>
      <Link
        to={`/write/${category}/modify/${postId}`}
        className="flex-1 py-2 bg-white text-gray-500 border border-gray-300 rounded-md text-center"
      >
        수정
      </Link>
      <button className="flex-1 py-2 bg-white text-gray-500 border border-gray-300 rounded-md">
        삭제
      </button>
    </div>
  );
}
