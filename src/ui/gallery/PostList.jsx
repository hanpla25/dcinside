import { Link } from "react-router";
import { formatDateTime } from "../../lib/utils";
import SeparatorDot from "../SeparatorDot";

export default function PostList({ posts, loading, error }) {
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (posts.length === 0)
    return <div className="py-60 text-center">게시글이 없습니다.</div>;
  
  return (
    <ul className="min-h-[60vh]">
      {posts.map((post) => (
        <Link key={post.id} to={`/${post.id}`}>
          <li className="p-2 border-b border-b-gray-400">
            <div>{post.title}</div>
            <div className="flex gap-1 text-xs text-gray-600">
              <span>{post.nickname}</span>
              <SeparatorDot />
              <span>{formatDateTime(post.create_at)}</span>
              <SeparatorDot />
              <span>조회수 123</span>
              <SeparatorDot />
              <span>추천 {post.post_like_count}</span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
