import { useAuth } from "../../context/AuthContext";
import { deleteComment } from "../../lib/actions";
import { formatDateTime } from "../../lib/utils";
import Loading from "../Loading";

export default function Comments({ comments, loading, onCommentAdded }) {
  const { user } = useAuth();
  if (loading) {
    return <Loading />;
  }

  if (!comments || comments.length === 0) {
    return <div className="text-gray-500 p-4">댓글이 없습니다.</div>;
  }

  console.log(comments);
  console.log(user);

  const handleDelete = async (commentId) => {
    let password = null;

    if (!user) {
      password = prompt("댓글 비밀번호를 입력하세요");
      if (!password) return;
    }

    try {
      await deleteComment({ comment_id: commentId, password });
      onCommentAdded();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "댓글 삭제 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div className="space-y-4 py-2">
      {comments.map((comment) => (
        <div key={comment.id} className="border-b border-gray-400 py-2">
          <div className="text-sm font-semibold text-gray-800 flex justify-between">
            <span>
              {comment.nickname ||
                `익명 (${comment.ip_addr.split(".").slice(0, 2).join(".")})`}
            </span>
            {(comment.nickname === null ||
              user?.nickname === comment.nickname) && (
              <button className="mr-2" onClick={() => handleDelete(comment.id)}>
                x
              </button>
            )}
          </div>
          <div className="text-base text-gray-700 whitespace-pre-wrap">
            {comment.content}
          </div>
          <div className="text-xs text-gray-400">
            {formatDateTime(comment.create_at)}
          </div>
        </div>
      ))}
    </div>
  );
}
