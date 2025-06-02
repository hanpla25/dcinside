import SizeOptionButton from "./SizeOptionButton";
import TapButtons from "./TapButtons";

export default function Tap({ size, setSize }) {
  return (
    <div className="flex items-center border-b border-gray-200 px-2 justify-between">
      <TapButtons size={size} />
      <SizeOptionButton size={size} setSize={setSize} />
    </div>
  );
}
