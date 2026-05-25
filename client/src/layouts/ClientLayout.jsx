import { Outlet, Link } from "react-router-dom";

function ClientLayout() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-cyan-500 text-white p-5">

        <h2 className="text-2xl font-bold mb-10">
          Client Panel
        </h2>

        <nav className="flex flex-col gap-4">

          <Link to="/client/dashboard">
            Dashboard
          </Link>

          <Link to="/client/my-therapist">
            My Therapist
          </Link>

          <Link to="/client/sessions">
            Sessions
          </Link>

          <Link to="/client/messages">
            Messages
          </Link>

          <Link to="/client/ai-support">
            AI Support
          </Link>

          <Link to="/client/payments">
            Payments
          </Link>

          <Link to="/client/settings">
            Settings
          </Link>

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
}

export default ClientLayout;