import { Outlet, useParams, useSearchParams } from "react-router";
import GalleryHeader from "../ui/gallery/GalleryHeader";
import { useEffect, useState } from "react";
import { fetchGalleryList, fetchPostList } from "../lib/data";
import Loading from "../ui/Loading";
import Pagination from "../ui/gallery/Pagination";
import SearchInput from "../ui/gallery/SearchInput ";

export default function GalleryLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();

  // state
  const [galleryList, setGalleryList] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const like_cut = searchParams.get("recomend") === "1" ? 10 : 0;
  const search = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const size = parseInt(searchParams.get("size") || "20", 10);
  const totalPages = Math.ceil(totalCount / size);

  useEffect(() => {
    const loadGalleryList = async () => {
      setLoading(true);
      try {
        const data = await fetchGalleryList();
        setGalleryList(data);
      } catch (error) {
        console.log("갤러리 리스트 오류: ", error);
      } finally {
        setLoading(false);
      }
    };
    loadGalleryList();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
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
      } catch (error) {
        console.log("게시글 패치 오류: ", error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [category, like_cut, search, currentPage, size]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <GalleryHeader category={category} galleryList={galleryList} />
      <Outlet context={{ posts, searchParams, setSearchParams, loading }} />
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
