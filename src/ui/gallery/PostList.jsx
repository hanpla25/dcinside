import { Link } from "react-router";
import SeparatorDot from "../SeparatorDot";
import { formatDateTime } from "../../lib/utils";
import Loading from "../Loading";

export default function PostList({ posts, loading, category }) {
  if (loading) return <Loading />;
  if (posts.length === 0)
    return <div className="py-60 text-center">등록된 게시글이 없습니다.</div>;

  return (
    <ul>
      {posts.map((post) => (
        <Link key={post.id} to={`/gallery/${category}/${post.id}`}>
          <li className="p-2 border-b border-gray-400">
            <div>{post.title}</div>
            <div className="text-xs text-gray-600">
              <span>
                {" "}
                {post.nickname ||
                  `익명 (${post.ip_addr.split(".").slice(0, 2).join(".")})`}
              </span>
              <SeparatorDot />
              <span>
                {formatDateTime(post.create_at, { onlyTimeIfToday: true })}
              </span>
              <SeparatorDot />
              <span>조회수 {post.view_count}</span>
              <SeparatorDot />
              <span>추천 {post.post_like_count}</span>
              <SeparatorDot />
              <span>댓글 {post.comment_count}</span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
