import { Link } from "react-router";
import { galleryList } from "../lib/placeholder-data";

export default function Category() {
  return (
    <div>
      <div className="text-xl font-semibold p-2 border-b border-gray-300">
        전체 갤러리
      </div>
      <ul className="grid grid-cols-2">
        {galleryList.map((item, idx) => (
          <Link to={"/gallery"}>
            <li
              key={idx}
              className={`p-3 hover:bg-gray-50 border-b border-gray-300 ${
                idx % 2 === 0 ? "border-r border-gray-300" : ""
              }`}
            >
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
