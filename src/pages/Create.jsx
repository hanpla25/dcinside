import CreateGalleryForm from "../ui/create/CreateGalleryForm";
import RequireLogin from "../ui/RequireLogin";
import { useNavigate } from "react-router";

export default function Create() {
  const navigate = useNavigate();
  if (!isLogin) {
    navigate("/login");
  }

  return (
    <RequireLogin>
      <div className="p-10">
        <CreateGalleryForm />
      </div>
    </RequireLogin>
  );
}
