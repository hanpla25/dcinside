import { useEffect, useState } from "react";
import GalleryList from "../ui/category/GalleryList";
import { fetchGalleryList } from "../lib/data";
import Loading from "../ui/Loading";
import CategoryHeader from "../ui/category/CategoryHeader";

export default function Category() {
  const [galleryList, setGalleryList] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <CategoryHeader />
      <GalleryList galleryList={galleryList} />
    </div>
  );
}
