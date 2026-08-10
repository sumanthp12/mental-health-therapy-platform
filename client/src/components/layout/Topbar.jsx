import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
function Topbar({ role }) {
  const navigate = useNavigate();

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const profileName = storedUser?.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header
      className="
        h-20
        bg-white
        border-b
        border-slate-200
        px-6
        flex
        items-center
        justify-between
      "
    >
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome Back, {profileName}!
        </h1>

        <p className="text-slate-500">
          Here's what's happening today
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        {/* Notifications */}
        <div className="relative">
          <Bell
            size={22}
            className="text-slate-700"
          />

          <span
            className="
              absolute
              -top-1
              -right-1
              w-2.5
              h-2.5
              rounded-full
              bg-red-500
            "
          />
        </div>

        {/* Profile */}
        <div
          onClick={handleProfileClick}
          className="
            flex
            items-center
            gap-3
            bg-slate-100
            px-4
            py-2
            rounded-2xl
            cursor-pointer
            hover:bg-slate-200
            transition
          "
        >
          {/* Avatar */}
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-white
              flex
              items-center
              justify-center
              font-semibold
            "
          >
            {profileName.charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          <div>
            <p className="font-semibold">
              {profileName}
            </p>

            <p className="text-xs text-slate-500">
              Logged In
            </p>
          </div>
        </div>

        {/* Logout */}
        <LogOut
          onClick={handleLogout}
          className="
            cursor-pointer
            text-slate-600
            hover:text-red-500
            transition
          "
        />

      </div>
    </header>
  );
}

export default Topbar;