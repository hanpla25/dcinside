import { Link } from "react-router";

export default function GalleryList({ galleryList }) {
  return (
    <div className="">
      <ul className="grid grid-cols-2">
        {galleryList.map((gall, idx) => (
          <Link
            key={gall.id + idx}
            to={`/gallery/${gall.abbr}`}
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
