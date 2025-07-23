import { useState } from "react";
import AdminContacts from "./components/admin_contact";
import AdminInformations from "./components/AdminInformations/AdminInformations_index";
import AdminUploadImages from "./components/AdminUploadImages";

const VIEWS = [
  { key: "contacts", label: "Danh sách liên hệ", component: <AdminContacts /> },
  { key: "profile", label: "Thông tin cá nhân", component: <AdminInformations /> },
  { key: "image", label: "Upload hình ảnh bài viết", component: <AdminUploadImages /> },
] as const;

type ViewKey = typeof VIEWS[number]["key"];

const AdminDashboard = () => {
  const [view, setView] = useState<ViewKey>("contacts");

  return (
    <div className="p-2 flex">
      {/* Sidebar */}
      <div className="w-48 bg-gray-100 p-4 rounded-lg mr-6 space-y-2 sticky">
        {VIEWS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`w-full text-left px-3 py-2 rounded ${
              view === key ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Nội dung bên phải */}
      <div className="flex-1">
        {VIEWS.find((v) => v.key === view)?.component}
      </div>
    </div>
  );
};

export default AdminDashboard;
