export default function Pagination({ page, totalCount, setSearchParams }) {
  const totalPages = Math.ceil(totalCount / 10);
  const groupSize = 5;
  const currentGroup = Math.floor((page - 1) / groupSize);
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
          className="px-2 py-1 border rounded"
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
          className={`px-3 py-1 border rounded ${
            p === page
              ? "bg-blue-500 text-white font-bold"
              : "bg-white text-gray-800"
          }`}
        >
          {p}
        </button>
      ))}

      {endPage < totalPages && (
        <button
          onClick={() => handlePageClick(startPage + groupSize)}
          className="px-2 py-1 border rounded"
        >
          &gt;
        </button>
      )}
    </div>
  );
}
