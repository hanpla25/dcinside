import { Link } from "react-router";
import { bestPosts } from "../lib/placeholder-data";

export default function BestPosts({ posts }) {
  return (
    <div className="font-semibold text-lg">
      <Link to={"/dcbest"}>
        <div className="bg-[#f5f5f5] p-2">실시간 베스트</div>
      </Link>
      <ul>
        {bestPosts.map((post) => (
          <li key={post.id} className="p-2 border-b last:border-b-0">
            <Link to={`/post/${post.url}`} className="flex flex-col gap-2">
              <div className="flex items-center justify-start gap-2">
                <div className="font-medium text-black">{post.title}</div>
                <div className="text-sm text-red-600">[{post.comments}]</div>
              </div>
              <div className="text-sm font-light">{post.gallery}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
