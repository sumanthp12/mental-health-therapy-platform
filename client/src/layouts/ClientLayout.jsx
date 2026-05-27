import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/sidebar";

import { clientLinks } from "../constants/sidebarLinks";

function ClientLayout() {
  return (
    <div className="flex h-screen">

      <Sidebar
        title="Client Panel"
        links={clientLinks}
        bgColor="bg-cyan-500"
      />

      <div className="flex-1 p-10 bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
}

export default ClientLayout;