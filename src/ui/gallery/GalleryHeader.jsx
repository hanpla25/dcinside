import { Link } from "react-router";

export default function GalleryHeader({ category, galleryList }) {
  const galleryName =
    galleryList.find((gall) => gall.abbr === category)?.name ?? null;

  return (
    <h1 className="flex justify-between px-3 font-semibold py-2 text-md border-b border-gray-300">
      <Link to={`/gallery/${category}`}>{galleryName}</Link>
      <Link to={`/writer/${category}`}>
        <button className="text-[#3b4890] border border-[#3b4890] p-1 text-sm">
          글쓰기
        </button>
      </Link>
    </h1>
  );
}
