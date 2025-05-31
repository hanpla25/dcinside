import { useOutletContext, useParams } from "react-router";
import PostInfo from "../ui/gallery/PostInfo";
import PostList from "../ui/gallery/PostList";
import { useEffect, useState } from "react";
import { fetchPostInfo } from "../lib/data";
import PostButtons from "../ui/gallery/PostButtons";
import Comment from "../ui/gallery/Comment";

export default function Post() {
  const { posts, loading, category, setPosts } = useOutletContext();
  const { postId } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    const loadPostInfo = async () => {
      setPostLoading(true);
      try {
        const data = await fetchPostInfo(postId);
        setPostInfo(data);
        setPosts((prev) =>
          prev.map((p) =>
            p.id === data.id
              ? {
                  ...p,
                  view_count: data.view_count,
                  comment_count: data.comment_count,
                }
              : p
          )
        );
      } catch (error) {
        console.log("게시글 정보 패치 오류:", error);
      } finally {
        setPostLoading(false);
      }
    };
    loadPostInfo();
  }, [postId]);

  return (
    <div className="px-2">
      <PostInfo
        postInfo={postInfo}
        postLoading={postLoading}
        setPosts={setPosts}
      />
      <PostButtons category={category} postId={postId} />
      <Comment postId={postId} postInfo={postInfo} />
      <PostList
        posts={posts}
        loading={loading}
        category={category}
        postId={postId}
      />
    </div>
  );
}
