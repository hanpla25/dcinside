export default function LikeDisLikeButton({
  likeCount,
  dislikeCount,
  onLike,
  onDislike,
}) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={onLike}
        className="flex items-center gap-1 px-3 py-1 text-[#3b4890] hover:bg-green-50"
      >
        <span>{likeCount}</span>
        <img src="/like_button.png" alt="like_button" />
      </button>
      <button
        onClick={onDislike}
        className="flex items-center gap-1 px-3 py-1 text-[#6c6f79] hover:bg-red-50"
      >
        <span>{dislikeCount}</span>
        <img src="/dislike_button.png" alt="dislike_button" />
      </button>
    </div>
  );
}
