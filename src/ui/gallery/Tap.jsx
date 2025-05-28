import { useSearchParams } from "react-router";

export default function Tap() {
  const [searchParams, setSearchParams] = useSearchParams();
  const recomend = searchParams.get("recomend");
  const notice = searchParams.get("notice");
  const tabs = ["전체글", "개념글", "공지"];
  const tab = notice === "1" ? "공지" : recomend === "1" ? "개념글" : "전체글";

  const handleClick = (label) => {
    if (label === "개념글") {
      setSearchParams({ recomend: "1" });
    } else if (label === "공지") {
      setSearchParams({ notice: "1" });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="flex items-center border-b border-gray-200">
      {tabs.map((label) => (
        <button
          key={label}
          onClick={() => handleClick(label)}
          className={`flex-1 px-2 py-2 text-center text-sm font-medium 
            ${
              tab === label
                ? "border-b-2 border-[#3b4890] text-[#3b4890]"
                : "text-gray-600"
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
