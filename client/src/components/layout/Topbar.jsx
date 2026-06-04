import {
  Bell,
  LogOut,
} from "lucide-react";

import { useNavigate }
from "react-router-dom";

function Topbar({ role }) {

  const roleName =
    role.charAt(0).toUpperCase() +
    role.slice(1);

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate("/login");
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

      <div>

        <h1
          className="
          text-2xl
          font-bold
          "
        >
          Welcome Back, {roleName}!
        </h1>

        <p
          className="
          text-slate-500
          "
        >
          Here's what's happening today
        </p>

      </div>

      <div
        className="
        flex
        items-center
        gap-5
        "
      >

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

        <div
          className="
          flex
          items-center
          gap-3
          bg-slate-100
          px-4
          py-2
          rounded-2xl
          "
        >

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
            U
          </div>

          <div>

            <p className="font-semibold">
              {roleName}
            </p>

            <p className="text-xs text-slate-500">
              Logged In
            </p>

          </div>

        </div>

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