import { useOutletContext } from "react-router";
import Tap from "../ui/gallery/Tap";
import PostList from "../ui/gallery/PostList";

export default function Gallery() {
  const { posts, searchParams, setSearchParams, loading } = useOutletContext();

  return (
    <>
      <Tap searchParams={searchParams} setSearchParams={setSearchParams} />
      <PostList posts={posts} loading={loading} />
    </>
  );
}
