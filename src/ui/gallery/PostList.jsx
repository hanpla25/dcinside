import { Link } from "react-router";
import { formatDateTime } from "../../lib/utils";
import SeparatorDot from "../SeparatorDot";

export default function PostList({ posts }) {
  if (!posts.length)
    return (
      <div className="py-10 text-center min-h-[73vh]">게시글이 없습니다.</div>
    );

  console.log(posts);
  return (
    <ul className="min-h-[50vh]">
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
