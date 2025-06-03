import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { handleCommentSubmit } from "../../lib/actions";

export default function CommentReplyForm({
  postId,
  onCommentAdded,
  commentId,
  setReplyTargetId,
}) {
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleCommentSubmit({
        post_id: postId,
        content: comment,
        password,
        prev_comment_id: commentId,
      });
      setComment("");
      setPassword("");
      onCommentAdded();
    } catch (error) {
      console.log("댓글 쓰기 에러: ", error);
    } finally {
      setLoading(false);
      setReplyTargetId(null);
    }
  };

  console.log(postId);

  return (
    <form onSubmit={handleSubmit} className="bg-white border p-4 space-y-4">
      <div className="flex items-center space-x-4">
        <span className="font-semibold">{user ? user.nickname : "익명"}</span>
        {!user && (
          <input
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-1 text-sm w-40"
          />
        )}
      </div>

      <div>
        <label htmlFor="comment" className="sr-only">
          댓글
        </label>
        <textarea
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          placeholder="답글을 입력하세요"
          className="w-full border rounded px-3 py-2 resize-none"
          required
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#3b4890] text-white px-2 py-1 hover:bg-[#2f3b75] text-sm disabled:opacity-50"
          disabled={loading || !comment.trim() || (!user && !password)}
        >
          등록
        </button>
      </div>
    </form>
  );
}
