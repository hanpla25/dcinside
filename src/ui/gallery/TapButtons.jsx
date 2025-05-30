export default function TapButtons({ searchParams, setSearchParams }) {
  const tabs = ["전체글", "개념글", "공지"];
  const tab =
    searchParams.get("notice") === "1"
      ? "공지"
      : searchParams.get("recomend") === "1"
      ? "개념글"
      : "전체글";

  const handleClick = (label) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("notice");
    newParams.delete("recomend");

    if (label === "개념글") {
      newParams.set("recomend", "1");
    } else if (label === "공지") {
      newParams.set("notice", "1");
    }

    newParams.set("page", "1");

    setSearchParams(newParams);
  };

  return (
    <div className="flex items-center gap-2">
      {tabs.map((label) => (
        <button
          key={label}
          onClick={() => handleClick(label)}
          className={`px-3 py-1 text-sm font-medium border-b-2 ${
            tab === label
              ? "border-[#3b4890] text-[#3b4890]"
              : "border-transparent text-gray-600"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
