import { useEffect, useState } from "react";
import Comments from "./Comments";
import { fetchComments } from "../../lib/data";

export default function Comment({ postId, postInfo }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const loadComment = async () => {
      try {
        const data = await fetchComments(postId);
        setComments(data);
      } catch (error) {
        console.log("댓글 불러오기 오류: ", error);
      } finally {
        setLoading(false);
      }
    };
    loadComment();
  }, []);

  console.log(postInfo);

  return (
    <div className="mx-2">
      <div className="flex items-center gap-2 py-4 border-b-2 border-gray-400">
        <h1 className="text-lg font-semibold">댓글</h1>
        <span className="text-red-600">{postInfo?.comment_count}</span>
        <button>
          <img src="/refresh_icon.png" alt="refresh" />
        </button>
      </div>
      <Comments comments={comments} loading={loading} />
    </div>
  );
}
