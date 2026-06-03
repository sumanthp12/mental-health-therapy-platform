import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageCircle,
  CreditCard,
  Brain,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar({ role }) {

  const menus = {

    admin: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Therapists",
        path: "/admin/therapists",
        icon: Users,
      },
      {
        name: "Clients",
        path: "/admin/clients",
        icon: Users,
      },
    ],

    client: [
      {
        name: "Dashboard",
        path: "/client/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "My Therapist",
        path: "/client/my-therapist",
        icon: Users,
      },
      {
        name: "Sessions",
        path: "/client/sessions",
        icon: Calendar,
      },
      {
        name: "Messages",
        path: "/client/messages",
        icon: MessageCircle,
      },
      {
        name: "AI Support",
        path: "/client/ai-support",
        icon: Brain,
      },
      {
        name: "Payments",
        path: "/client/payments",
        icon: CreditCard,
      },
    ],

    therapist: [
      {
        name: "Dashboard",
        path: "/therapist/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Clients",
        path: "/therapist/clients",
        icon: Users,
      },
      {
        name: "Sessions",
        path: "/therapist/sessions",
        icon: Calendar,
      },
      {
        name: "Messages",
        path: "/therapist/messages",
        icon: MessageCircle,
      },
    ],
  };

  return (
    <aside
      className="
      w-64
      min-h-screen
      bg-white
      border-r
      border-slate-200
      flex
      flex-col
      "
    >

      <div className="p-6 border-b">

        <div
          className="
          h-14
          w-14
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          flex
          items-center
          justify-center
          text-white
          font-bold
          text-xl
          shadow-lg
          "
        >
          M
        </div>

        <h1 className="mt-4 text-xl font-bold">
          Mindful Connect
        </h1>

        <p className="text-sm text-slate-500">
          Mental Wellness Platform
        </p>

      </div>

      <nav className="flex-1 p-4">

        {menus[role]?.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-2xl
                mb-2
                transition-all
                duration-200

                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100"
                }
                `
              }
            >
              <Icon size={20} />
              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>

      <div className="p-4 mt-auto">

        <div
          className="
          rounded-2xl
          bg-slate-100
          p-4
          "
        >
          <p className="font-semibold">
            Mental Wellness
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Supporting better care and therapy outcomes.
          </p>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;