import { useNavigate, useParams } from "react-router";
import GalleryHeader from "../ui/gallery/Header";
import { useGallery } from "../context/GalleryContext";
import Tap from "../ui/gallery/Tap";
import PostList from "../ui/gallery/PostList";
import { useEffect, useState } from "react";
import { fetchPostList } from "../lib/data";
import Loading from "../ui/Loading";
import Pagination from "../ui/gallery/Pagination";

export default function Gallery() {
  const { category } = useParams();
  const { galleryList } = useGallery();
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const valid = galleryList.some((g) => g.abbr === category);
  const navigate = useNavigate();
  const galleryName = galleryList?.find((item) => item.abbr === category)?.name;

  useEffect(() => {
    if (galleryList.length === 0) return;
    if (!valid) {
      navigate("/");
    }
  }, [galleryList, valid, navigate]);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);

      try {
        const data = await fetchPostList(category, 1);
        setPostList(data.posts);
      } catch (error) {
        console.error("글 목록 로딩 실패", error);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [category, galleryList, navigate]);

  const posts = postList?.filter((post) => post.category_name === galleryName);

  return (
    <div>
      <GalleryHeader category={category} galleryName={galleryName} />
      <Tap />
      {loading ? <Loading /> : <PostList posts={posts} />}
      <Pagination />
    </div>
  );
}
