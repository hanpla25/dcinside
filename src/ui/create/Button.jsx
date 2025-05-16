export default function Button({ submitting }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="bg-[#3b4890] text-white px-4 py-2 rounded hover:bg-[#2f3b75] disabled:opacity-50"
    >
      {submitting ? "생성 중..." : "생성"}
    </button>
  );
}
