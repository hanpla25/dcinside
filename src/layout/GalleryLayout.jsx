import { Outlet } from "react-router";
import { GalleryProvider } from "../context/GalleryContext";

export default function GalleryLayout() {
  return (
    <GalleryProvider>
      <Outlet />
    </GalleryProvider>
  );
}
