import { useOutletContext } from "react-router";
import Tap from "../ui/gallery/Tap";
import PostList from "../ui/gallery/PostList";

export default function Gallery() {
  const { posts, loading, category, size, setSize } = useOutletContext();

  return (
    <>
      <Tap size={size} setSize={setSize} />
      <PostList posts={posts} loading={loading} category={category} />
    </>
  );
}
