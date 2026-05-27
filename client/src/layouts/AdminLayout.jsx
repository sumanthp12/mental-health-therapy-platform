import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/sidebar";

import { adminLinks } from "../constants/sidebarLinks";

function AdminLayout() {
  return (
    <div className="flex h-screen">

      <Sidebar
        title="Admin Panel"
        links={adminLinks}
        bgColor="bg-blue-500"
      />

      <div className="flex-1 p-10 bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;