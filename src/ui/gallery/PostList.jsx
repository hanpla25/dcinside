import { Link } from "react-router";
import SeparatorDot from "../SeparatorDot";
import { formatDateTime } from "../../lib/utils";
import Loading from "../Loading";

export default function PostList({ posts, loading }) {
  if (loading) return <Loading />;
  if (posts.length === 0)
    return <div className="py-60 text-center">등록된 게시글이 없습니다.</div>;

  return (
    <ul className="">
      {posts.map((post) => (
        <Link key={post.id} to={`${post.id}`}>
          <li className="p-2 border-b border-b-gray-400">
            <div>{post.title}</div>
            <div className="flex gap-1 text-xs text-gray-600">
              <span>{post.nickname || "ㅇㅇ"}</span>
              <SeparatorDot />
              <span>{formatDateTime(post.create_at)}</span>
              <SeparatorDot />
              <span>조회수 {post.view_count}</span>
              <SeparatorDot />
              <span>추천 {post.post_like_count}</span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
