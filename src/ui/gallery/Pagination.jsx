export default function Pagination({
  currentPage,
  setSearchParams,
  totalPages,
}) {
  if (currentPage < 1 || currentPage > totalPages) return null;
  const groupSize = 5;
  const currentGroup = Math.floor((currentPage - 1) / groupSize);
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  const handlePageClick = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", newPage);
      return next;
    });
  };

  return (
    <div className="mt-4 flex justify-center gap-2 items-center">
      {startPage > 1 && (
        <button
          onClick={() => handlePageClick(startPage - groupSize)}
          className=""
        >
          &lt;
        </button>
      )}

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((p) => (
        <button
          key={p}
          onClick={() => handlePageClick(p)}
          className={`px-3 py-1 ${
            p === currentPage ? "text-[#3b4890] font-bold" : " "
          }`}
        >
          {p}
        </button>
      ))}

      {endPage < totalPages && (
        <button
          onClick={() => handlePageClick(startPage + groupSize)}
          className=""
        >
          &gt;
        </button>
      )}
    </div>
  );
}
