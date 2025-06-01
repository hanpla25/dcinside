import { useState } from "react";
import { createGallery } from "../../lib/actions";
import { useNavigate } from "react-router";

export default function CreateGalleryForm() {
  const [baseName, setBaseName] = useState("");
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessages({}); // 이전 에러 초기화

    const nameWithSuffix = `${baseName.trim()} 갤러리`;

    try {
      await createGallery({ name: nameWithSuffix, abbr: url });
      alert("갤러리 신청이 완료되었습니다!");
      setBaseName("");
      setUrl("");
      navigate("/category");
    } catch (error) {
      if (error.response?.status === 400 && error.response.data) {
        setErrorMessages(error.response.data);
      } else {
        alert("갤러리 신청에 실패했습니다.");
        console.error(error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">새 갤러리 신청</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            이름
          </label>
          <input
            id="name"
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="예: 음식"
            value={baseName}
            onChange={(e) => setBaseName(e.target.value)}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            "갤러리"는 자동으로 붙습니다. 예: 음식 → 음식 갤러리
          </p>
          {errorMessages.name && (
            <p className="text-sm text-red-500 mt-1">{errorMessages.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="url" className="block font-medium mb-1">
            URL
          </label>
          <input
            id="url"
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="예: food"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            갤러리 경로에 사용될 URL (예: /gallery/food)
          </p>
          {errorMessages.abbr && (
            <p className="text-sm text-red-500 mt-1">{errorMessages.abbr}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#3b4890] text-white px-4 py-2 rounded hover:bg-[#2f3b75] disabled:opacity-50"
          >
            {submitting ? "신청 중..." : "신청"}
          </button>
        </div>
      </form>
    </div>
  );
}
