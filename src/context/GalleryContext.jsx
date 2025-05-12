import { createContext, useContext, useEffect, useState } from "react";
import { fetchGalleryList } from "../lib/data";

const GalleryContext = createContext();

export function GalleryProvider({ children }) {
  const [galleryList, setGalleryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryList()
      .then(setGalleryList)
      .catch((err) => console.error("갤러리 로딩 실패", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <GalleryContext.Provider value={{ galleryList, loading }}>
      {children}
    </GalleryContext.Provider>
  );
}

export const useGallery = () => useContext(GalleryContext);
