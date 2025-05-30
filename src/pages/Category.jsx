import { useEffect, useState } from "react";
import GalleryList from "../ui/category/GalleryList";
import { fetchGalleryList } from "../lib/data";

export default function Category() {
  const [galleryList, setGalleryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGalleryList = async () => {
    setLoading(true);
    try {
      const data = await fetchGalleryList();
      setGalleryList(data);
    } catch (error) {
      console.log("갤러리 로딩 실패: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGalleryList();
  }, []);

  console.log(galleryList);

  return (
    <div className="max-w-7xl mx-auto">
      <GalleryList galleryList={galleryList} loading={loading} />
    </div>
  );
}
