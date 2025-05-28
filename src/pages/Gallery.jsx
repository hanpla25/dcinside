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
  const { category } = useParams();
  const { galleryList, loading: galleryLoading } = useGallery();
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const galleryName = galleryList.find((item) => item.abbr === category)?.name;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const like_cut = searchParams.get("recomend") === "1" ? 10 : 0;
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

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
          page,
          like_cut,
          search,
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
  }, [category, like_cut, search, page]);

  return (
    <div>
      <GalleryHeader category={category} galleryName={galleryName} />
      <Tap setSearchParams={setSearchParams} />
      <PostList posts={posts} loading={loading} error={error} />
      <Pagination
        page={page}
        totalCount={totalCount}
        setSearchParams={setSearchParams}
      />
      <SearchInput search={search} setSearchParams={setSearchParams} />
    </div>
  );
}
