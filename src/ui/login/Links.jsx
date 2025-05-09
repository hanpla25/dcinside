import { Link } from "react-router";

export default function Links() {
  return (
    <div className="flex justify-center gap-4 text-sm my-4">
      <a href="#">아이디 찾기</a>
      <span className="text-gray-400">|</span>
      <a href="#">비밀번호 찾기</a>
      <span className="text-gray-400">|</span>
      <Link to={"/signup"}>회원가입</Link>
    </div>
  );
}
