export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageGroupSize = 5,
}) {
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrevGroup = () => {
    const prevGroupFirst = startPage - pageGroupSize;
    if (prevGroupFirst >= 1) {
      onPageChange(prevGroupFirst);
    }
  };

  const handleNextGroup = () => {
    const nextGroupFirst = startPage + pageGroupSize;
    if (nextGroupFirst <= totalPages) {
      onPageChange(nextGroupFirst);
    }
  };

  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      <button
        onClick={handlePrevGroup}
        disabled={startPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &lt;
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${
            page === currentPage ? "bg-blue-500 text-white" : ""
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNextGroup}
        disabled={endPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}
