import CreateGalleryForm from "../ui/create/CreateGalleryForm";
import RequireLogin from "../ui/RequireLogin";

export default function Create() {
  return (
    <RequireLogin>
      <div className="p-10 mx-auto max-w-7xl">
        <CreateGalleryForm />
      </div>
    </RequireLogin>
  );
}
