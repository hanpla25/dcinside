export default function ProfileHeader({ isEdit, setIsEdit }) {
  const handleEditingButton = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <div className="flex justify-between p-4">
      <h1 className="text-xl font-semibold text-gray-800">프로필</h1>
      <button
        className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"
        onClick={handleEditingButton}
      >
        {isEdit ? "취소" : "변경하기"}
      </button>
    </div>
  );
}
