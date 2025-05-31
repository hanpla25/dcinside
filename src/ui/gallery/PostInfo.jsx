import { useState } from "react";
import Loading from "../Loading";
import LikeDisLikeButton from "./LikeDisLikeButton";
import { handleDislikeButton, handleLikeButton } from "../../lib/actions";
import SeparatorDot from "../SeparatorDot";

export default function PostInfo({ postInfo, postLoading, setPosts }) {
  if (postLoading) return <Loading />;
  if (!postInfo) return null;

  const {
    id,
    title,
    nickname,
    create_at,
    view_count,
    post_like_count,
    post_dislike_count,
    comment_count,
    content,
  } = postInfo;

  const [likeCount, setLikeCount] = useState(post_like_count);
  const [dislikeCount, setDislikeCount] = useState(post_dislike_count);

  const onLike = async () => {
    try {
      await handleLikeButton(id);
      setLikeCount((prev) => prev + 1);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, post_like_count: p.post_like_count + 1 } : p
        )
      );
    } catch (err) {
      console.error("추천 실패:", err);
    }
  };

  const onDislike = async () => {
    try {
      await handleDislikeButton(id);
      setDislikeCount((prev) => prev + 1);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, post_dislike_count: p.post_dislike_count + 1 }
            : p
        )
      );
    } catch (err) {
      console.error("비추천 실패:", err);
    }
  };

  return (
    <div className="py-4 space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="text-sm text-gray-500">
        <span className="mr-2">{nickname || "ㅇㅇ"}</span>
        <SeparatorDot />
        <span className="ml-2">{new Date(create_at).toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-600 border-b pb-2">
        <span>조회수: {view_count}</span>
        <span>추천: {likeCount}</span>
        <span>댓글: {comment_count}</span>
      </div>
      <div className="text-base whitespace-pre-wrap">{content}</div>
      <LikeDisLikeButton
        likeCount={likeCount}
        dislikeCount={dislikeCount}
        onLike={onLike}
        onDislike={onDislike}
      />
    </div>
  );
}
