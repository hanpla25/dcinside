import { useAuth } from "../../context/AuthContext";

export default function ProfileForm() {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center py-10">로그인이 필요합니다.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">프로필</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 text-sm mb-1">이름</label>
          <div className="border px-3 py-2 rounded bg-gray-50">{user.nickname}</div>
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">아이디</label>
          <div className="border px-3 py-2 rounded bg-gray-50">{user.id}</div>
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">비밀번호</label>
          <div className="border px-3 py-2 rounded bg-gray-50">
            {user.password}
          </div>
        </div>
      </div>
    </div>
  );
}
