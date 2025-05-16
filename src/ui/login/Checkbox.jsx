export default function Checkbox() {
  return (
    <div className="pt-2">
      <input id="remember" type="checkbox" className="mr-2" />
      <label htmlFor="remember" className="text-sm text-gray-600">
        아이디 저장
      </label>
    </div>
  );
}
