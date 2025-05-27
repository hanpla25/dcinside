import { Link } from "react-router";

export default function Button({ category }) {
  return (
    <Link to={`/writer/${category}`}>
      <button className="text-[#3b4890] border border-[#3b4890] p-1 text-sm">
        글쓰기
      </button>
    </Link>
  );
}
