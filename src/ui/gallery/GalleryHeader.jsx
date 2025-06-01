import { Link, useLocation } from "react-router";

export default function GalleryHeader({ category, galleryList }) {
  const location = useLocation();
  const galleryName =
    galleryList.find((gall) => gall.abbr === category)?.name ?? null;

  const isOnWritePage = location.pathname.startsWith(`/write`);

  return (
    <h1 className="flex justify-between px-3 font-semibold py-2 text-md border-b border-gray-300 ">
      <Link to={`/gallery/${category}`}>
        <span className="text-blue-800">{galleryName}</span>
        <span> 갤러리</span>
      </Link>
      {!isOnWritePage && (
        <Link to={`/write/${category}`}>
          <button className="text-[#3b4890] border border-[#3b4890] p-1 text-sm">
            글쓰기
          </button>
        </Link>
      )}
    </h1>
  );
}
