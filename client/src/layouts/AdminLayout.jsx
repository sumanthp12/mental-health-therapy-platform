import { Outlet } from "react-router-dom";

import AppShell from "../components/layout/AppShell";

function AdminLayout() {
  return (
    <AppShell role="admin">
      <Outlet />
    </AppShell>
  );
}

export default AdminLayout;