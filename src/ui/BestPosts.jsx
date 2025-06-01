import { Link } from "react-router";
import { bestPosts } from "../lib/placeholder-data";

export default function BestPosts({ posts }) {
  const data = posts?.length > 0 ? posts : bestPosts;
  console.log(posts)
  return (
    <div className="font-semibold text-lg min-h-[82.2vh]">
      <Link to={"/dcbest"}>
        <div className="bg-[#f5f5f5] p-2">실시간 베스트</div>
      </Link>
      <ul>
        {data.map((post, i) => (
          <li key={post.id} className="p-2 border-b last:border-b-0">
            <Link to={`/gallery/${i + 1}`} className="flex flex-col gap-2">
              <div className="flex items-center justify-start gap-2">
                <div className="font-medium text-black truncate max-w-[calc(100%-3rem)]">
                  {post.title}
                </div>
                <div className="text-sm text-red-600 shrink-0">
                  [{post.comment_count || 0}]
                </div>
              </div>
              <div className="text-sm font-light">{post.gallery}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
