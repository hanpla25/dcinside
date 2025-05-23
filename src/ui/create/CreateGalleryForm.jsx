import { useState } from "react";
import { createGallery } from "../../lib/actions";
import { useNavigate } from "react-router";
import Button from "./Button";
import { useGallery } from "../../context/GalleryContext";

export default function CreateGalleryForm() {
  const [baseName, setBaseName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { refetchGalleryList } = useGallery();

  const resetForm = () => {
    setBaseName("");
    setAbbreviation("");
  };

  const formatName = (name) => `${name.trim()} 갤러리`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const name = formatName(baseName);

    try {
      await createGallery({ name, abbreviation });
      await refetchGalleryList();
      console.log("갤러리 생성 성공");
      alert("갤러리 신청이 완료되었습니다!");
      resetForm();
      navigate("/category");
    } catch (error) {
      console.error("갤러리 생성 실패", error);
      alert("갤러리 신청에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = "w-full border rounded px-3 py-2";

  return (
    <div className="mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">새 갤러리 생성</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">이름</label>
          <input
            type="text"
            className={inputStyle}
            placeholder="예: 음식"
            value={baseName}
            onChange={(e) => setBaseName(e.target.value)}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            "갤러리"는 자동으로 붙습니다. 예: 음식 → 음식 갤러리
          </p>
        </div>

        <div>
          <label className="block font-medium mb-1">URL</label>
          <input
            type="text"
            className={inputStyle}
            placeholder="예: food"
            value={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            갤러리 경로에 사용될 url (예: /gallery/food)
          </p>
        </div>

        <div className="flex justify-end">
          <Button submitting={submitting} />
        </div>
      </form>
    </div>
  );
}
