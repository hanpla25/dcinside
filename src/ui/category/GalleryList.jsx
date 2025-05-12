import { Link } from "react-router";
import { useGallery } from "../../context/GalleryContext";

export default function GalleryList() {
  const { galleryList, loading } = useGallery();

  if (loading) return <div className="text-center py-4">로딩 중...</div>;

  return (
    <div>
      <div className="flex justify-between text-xl font-semibold p-2 border-b border-gray-300">
        <span>전체 갤러리</span>
        <Link to="/create">
          <button className="text-sm border text-[#3b4890] border-[#3b4890] rounded-full px-3 py-1">
            갤러리 생성
          </button>
        </Link>
      </div>
      <ul className="grid grid-cols-2">
        {galleryList.map((gall, idx) => (
          <Link
            key={gall.url + idx}
            to={`/gallery${gall.url}`}
            className={`p-3 hover:bg-gray-50 border-b border-gray-300 ${
              idx % 2 === 0 ? "border-r border-gray-300" : ""
            }`}
          >
            {gall.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}
