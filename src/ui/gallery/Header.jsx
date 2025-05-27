import { Link } from "react-router";
import Button from "./Button";

export default function GalleryHeader({ category, galleryName }) {
  return (
    <h1 className="flex justify-between px-3 font-semibold py-2 text-md border-b border-gray-300">
      <Link to={`/gallery/${category}`}>{galleryName}</Link>
      <Button category={category} />
    </h1>
  );
}
