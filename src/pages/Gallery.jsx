import { useNavigate, useParams, useSearchParams } from "react-router";
import GalleryHeader from "../ui/gallery/Header";
import { useGallery } from "../context/GalleryContext";
import { useEffect, useState } from "react";
import Tap from "../ui/gallery/Tap";
import PostList from "../ui/gallery/PostList";
import Pagination from "../ui/gallery/Pagination";
import SearchInput from "../ui/gallery/SearchInput";
import { fetchPostList } from "../lib/data";

export default function Gallery() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { galleryList, loading: galleryLoading } = useGallery();
  const [searchParams, setSearchParams] = useSearchParams();

  // state
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 페이지
  const sizes = [1, 20, 30, 50];
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const size = parseInt(searchParams.get("size") || "20", 10);
  const totalPages = 16;

  // 갤러리
  const galleryName = galleryList.find((item) => item.abbr === category)?.name;
  const like_cut = searchParams.get("recomend") === "1" ? 10 : 0;
  const search = searchParams.get("search") || "";

  useEffect(() => {
    if (galleryLoading) return;
    if (!galleryName) {
      navigate("/");
    }
  }, [galleryLoading, galleryName, navigate]);

  useEffect(() => {
    if (!category) return;

    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPostList({
          abbr: category,
          page: currentPage,
          like_cut,
          search,
          size,
        });
        setPosts(data.posts);
        setTotalCount(data.totalCount);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [category, like_cut, search, currentPage, size]);

  return (
    <div>
      <GalleryHeader category={category} galleryName={galleryName} />
      <Tap setSearchParams={setSearchParams} size={size} sizes={sizes} />
      <PostList posts={posts} loading={loading} error={error} />
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        setSearchParams={setSearchParams}
        size={size}
        totalPages={totalPages}
      />
      <SearchInput search={search} setSearchParams={setSearchParams} />
    </div>
  );
}
