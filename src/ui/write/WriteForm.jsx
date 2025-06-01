import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { handlePost } from "../../lib/actions";
import { useAuth } from "../../context/AuthContext";

export default function WriteForm() {
  const { category: abbr } = useParams();
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleWriteSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await handlePost({ abbr, title, content, password });
      alert("게시글이 등록되었습니다.");
      navigate(`/gallery/${abbr}`);
    } catch (error) {
      console.error(error);
      alert("등록에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };
  console.log(isLogin);

  return (
    <form
      onSubmit={handleWriteSubmit}
      className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow space-y-6"
    >
      <h1 className="font-bold text-lg">글쓰기</h1>
      <div className="space-y-4">
        {isLogin ? null : (
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비로그인은 비밀번호가 필요합니다."
              className="w-full border rounded px-3 py-2"
            />
          </div>
        )}

        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
            className="w-full border rounded px-3 py-2"
          />
          <p className="text-sm text-gray-500 mt-1">
            쉬운 비밀번호를 입력하면 타인의 수정, 삭제가 쉬울 수 있습니다.
          </p>
        </div>

        <div>
          <label htmlFor="textarea" className="block font-medium mb-1">
            글 내용
          </label>
          <textarea
            id="textarea"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2 resize-none"
            placeholder="내용을 입력해주세요."
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#3b4890] text-white px-4 py-2 rounded hover:bg-[#2f3b75] disabled:opacity-50"
        >
          {submitting ? "등록 중..." : "등록"}
        </button>
      </div>
    </form>
  );
}
