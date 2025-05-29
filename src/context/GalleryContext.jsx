import { createContext, useContext, useEffect, useState } from "react";
import { fetchGalleryList } from "../lib/data";
import { useParams } from "react-router";

const GalleryContext = createContext();

export function GalleryProvider({ children }) {
  const { category } = useParams(); 
  const [galleryList, setGalleryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const galleryName =
    galleryList.find((g) => g.abbr === category)?.name ?? null;

  const refetchGalleryList = async () => {
    setLoading(true);
    try {
      const data = await fetchGalleryList();
      setGalleryList(data);
    } catch (error) {
      console.error("갤러리 로딩 실패", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchGalleryList();
  }, []);

  return (
    <GalleryContext.Provider
      value={{
        galleryList,
        loading,
        refetchGalleryList,
        category,
        galleryName,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export const useGallery = () => useContext(GalleryContext);
