import { useEffect, useState } from "react";
import Comments from "./Comments";
import { fetchComments } from "../../lib/data";
import CommentForm from "./CommentForm";

export default function Comment({ postId, postInfo }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentId, setCommentId] = useState(null);

  const loadComment = async () => {
    setLoading(true);
    try {
      const data = await fetchComments(postId);
      setComments(data);
    } catch (error) {
      console.log("댓글 불러오기 오류: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComment();
  }, [postId]);

  return (
    <div className="mx-2">
      <div className="flex items-center gap-2 py-4 border-b-2 border-gray-400">
        <h1 className="text-lg font-semibold">댓글</h1>
        <span className="text-red-600">{postInfo?.comment_count}</span>
        <button>
          <img src="/refresh_icon.png" alt="refresh" />
        </button>
      </div>
      <Comments
        comments={comments}
        loading={loading}
        onCommentAdded={loadComment}
        commentId={commentId}
        setCommentId={setCommentId}
        postId={postId}
      />
      <CommentForm
        postId={postId}
        onCommentAdded={loadComment}
        commentId={commentId}
      />
    </div>
  );
}
