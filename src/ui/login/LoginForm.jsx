import { LoginButton } from "./Buttons";
import Links from "./Links";

export default function LoginForm() {
  return (
    <form className="space-y-4 max-w-md w-full">
      <input
        type="text"
        placeholder="아이디"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4890]"
      />
      <input
        type="password"
        placeholder="비밀번호"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b4890]"
      />

      {/* 아이디 저장 체크박스 */}
      <div className="flex items-center">
        <input id="remember" type="checkbox" className="mr-2" />
        <label htmlFor="remember" className="text-sm text-gray-600">
          아이디 저장
        </label>
      </div>

      {/* 로그인 버튼 */}
      <LoginButton />

      {/* 아이디/비밀번호 찾기/회원가입 */}
      <Links />
    </form>
  );
}
