import { Link, useLocation } from "react-router";

export default function NavLinks() {
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [{ name: "갤러리", href: "/category", gallery: "/gallery" }];

  return (
    <nav className="flex justify-evenly border-b border-gray-200 px-4">
      {links.map((link) => {
        const isActive =
          currentPath.startsWith(link.href) ||
          currentPath.startsWith(link.gallery);

        return (
          <Link
            key={link.name}
            to={link.href}
            className={`py-1.5 px-4 text-m font-medium ${
              isActive ? "text-[#FFED44] font-semibold" : "text-white"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
