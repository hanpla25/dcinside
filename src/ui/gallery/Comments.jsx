import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { deleteComment } from "../../lib/actions";
import { formatDateTime } from "../../lib/utils";
import Loading from "../Loading";
import CommentReplyForm from "./CommetReplyForm";

export default function Comments({
  comments,
  loading,
  onCommentAdded,
  commentId,
  setCommentId,
  postId,
}) {
  const { user } = useAuth();
  const [replyTargetId, setReplyTargetId] = useState(null);
  if (loading) {
    return <Loading />;
  }

  if (!comments || comments.length === 0) {
    return <div className="text-gray-500 p-4">댓글이 없습니다.</div>;
  }

  console.log(comments);

  const handleClick = (comment) => {
    setReplyTargetId((prev) => (prev === comment.id ? null : comment.id));
    setCommentId(comment.id);
    console.log(comment.id);
  };

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
      {comments
        .filter((c) => c.prev_comment_id === null)
        .map((parent) => {
          const isDeleted = parent.deleted;
          const replies = comments.filter(
            (reply) => reply.prev_comment_id === parent.id && !reply.deleted
          );

          return (
            <div key={parent.id}>
              {/* 부모 댓글 */}
              <div
                className="border-b border-gray-400 py-2"
                onClick={() => !isDeleted && handleClick(parent)}
              >
                <div className="text-sm font-semibold text-gray-800 flex justify-between">
                  <span>
                    {parent.nickname ||
                      `익명 (${parent.ip_addr
                        .split(".")
                        .slice(0, 2)
                        .join(".")})`}
                  </span>
                  {!isDeleted &&
                    (parent.nickname === null ||
                      user?.nickname === parent.nickname) && (
                      <button
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(parent.id);
                        }}
                      >
                        x
                      </button>
                    )}
                </div>
                <div className="text-base text-gray-700 whitespace-pre-wrap">
                  {isDeleted ? "삭제된 댓글입니다." : parent.content}
                </div>
                <div className="text-xs text-gray-400">
                  {formatDateTime(parent.create_at)}
                </div>
              </div>

              {/* 답글 입력 폼 */}
              {!isDeleted && replyTargetId === parent.id && (
                <CommentReplyForm
                  postId={postId}
                  commentId={commentId}
                  onCommentAdded={onCommentAdded}
                  setReplyTargetId={setReplyTargetId}
                />
              )}

              {/* 답글 */}
              <div className="ml-4 space-y-2">
                {replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="pl-4 py-2 bg-gray-100 border-b border-gray-300 flex gap-2"
                  >
                    {/* ㄴ 모양 */}
                    <div className="text-blue-500 font-bold">ㄴ</div>

                    {/* 답글 본문 */}
                    <div className="flex-1">
                      <div className="text-sm text-gray-700 flex justify-between">
                        <span>
                          {reply.nickname ||
                            `익명 (${reply.ip_addr
                              .split(".")
                              .slice(0, 2)
                              .join(".")})`}
                        </span>
                        {(reply.nickname === null ||
                          user?.nickname === reply.nickname) && (
                          <button
                            className="mr-2 text-xs"
                            onClick={() => handleDelete(reply.id)}
                          >
                            x
                          </button>
                        )}
                      </div>
                      <div className="text-base text-gray-800 whitespace-pre-wrap">
                        {reply.content}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatDateTime(reply.create_at)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
