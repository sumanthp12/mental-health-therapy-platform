import { Outlet, Link } from "react-router-dom";

function TherapistLayout() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-green-500 text-white p-5">

        <h2 className="text-2xl font-bold mb-10">
          Therapist Panel
        </h2>

        <nav className="flex flex-col gap-4">

          <Link to="/therapist/dashboard">
            Dashboard
          </Link>

          <Link to="/therapist/clients">
            Clients
          </Link>

          <Link to="/therapist/sessions">
            Sessions
          </Link>

          <Link to="/therapist/messages">
            Messages
          </Link>

          <Link to="/therapist/profile">
            Profile
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

export default TherapistLayout;