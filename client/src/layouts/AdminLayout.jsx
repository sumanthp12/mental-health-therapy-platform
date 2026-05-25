import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-blue-500 text-white p-5">
        <h2 className="text-2xl font-bold mb-10">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4">
          <Link to="/admin/dashboard">Dashboard</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;