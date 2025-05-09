import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#3b4890] flex justify-center py-4">
      <Link
        to="/login"
        className="w-11/12 py-2 border border-gray-400 text-white rounded-md font-medium text-center"
      >
        로그인
      </Link>
    </footer>
  );
}
