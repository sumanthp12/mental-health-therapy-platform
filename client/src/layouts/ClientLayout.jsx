import { Outlet } from "react-router-dom";

import AppShell from "../components/layout/AppShell";

function ClientLayout() {
  return (
    <AppShell role="client">
      <Outlet />
    </AppShell>
  );
}

export default ClientLayout;