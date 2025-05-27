import { createContext, useContext, useEffect, useState } from "react";
import { fetchGalleryList } from "../lib/data";

const GalleryContext = createContext();

export function GalleryProvider({ children }) {
  const [galleryList, setGalleryList] = useState([]);
  const [loading, setLoading] = useState(true);

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
      value={{ galleryList, loading, refetchGalleryList }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export const useGallery = () => useContext(GalleryContext);
