import { useLocation, useParams } from "react-router";
import GalleryHeader from "../ui/gallery/GalleryHeader";
import Loading from "../ui/Loading";
import { useEffect, useState } from "react";
import { fetchGalleryList } from "../lib/data";
import WriteForm from "../ui/write/WriteForm";

export default function Write() {
  const { category } = useParams();
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
      <GalleryHeader galleryList={galleryList} category={category} />
      <WriteForm />
    </div>
  );
}
