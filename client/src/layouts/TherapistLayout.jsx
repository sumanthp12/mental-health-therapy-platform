import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/sidebar";

import { therapistLinks } from "../constants/sidebarLinks";

function TherapistLayout() {
  return (
    <div className="flex h-screen">

      <Sidebar
        title="Therapist Panel"
        links={therapistLinks}
        bgColor="bg-green-500"
      />

      <div className="flex-1 p-10 bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
}

export default TherapistLayout;