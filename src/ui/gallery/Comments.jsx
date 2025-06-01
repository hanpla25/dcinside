import { formatDateTime } from "../../lib/utils";
import Loading from "../Loading";

export default function Comments({ comments, loading }) {
  if (loading) {
    return <Loading />;
  }

  if (!comments || comments.length === 0) {
    return <div className="text-gray-500 p-4">댓글이 없습니다.</div>;
  }
  console.log(comments);

  return (
    <div className="space-y-4 py-2">
      {comments.map((comment) => (
        <div key={comment.id} className="border-b border-gray-400 py-2">
          <div className="text-sm font-semibold text-gray-800">
            <div className="text-sm font-semibold text-gray-800">
              {comment.nickname ||
                `익명 (${comment.ip_addr.split(".").slice(0, 2).join(".")})`}
            </div>
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
