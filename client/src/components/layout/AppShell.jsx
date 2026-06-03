import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppShell({
  role,
  children,
}) {
  return (
    <div className="flex h-screen bg-slate-50">

      <Sidebar role={role} />

      <div className="flex flex-col flex-1 overflow-hidden">

        <Topbar role={role} />

        <main
          className="
          flex-1
          overflow-y-auto
          p-8
          "
        >
          <div
            className="
            max-w-7xl
            mx-auto
            "
          >
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}

export default AppShell;