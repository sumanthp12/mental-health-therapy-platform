import { Outlet } from "react-router-dom";

import AppShell from "../components/layout/AppShell";

function TherapistLayout() {
  return (
    <AppShell role="therapist">
      <Outlet />
    </AppShell>
  );
}

export default TherapistLayout;