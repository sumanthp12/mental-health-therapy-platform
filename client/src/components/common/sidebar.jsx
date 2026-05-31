import { NavLink } from "react-router-dom";

function Sidebar({ title, links, bgColor }) {
  return (
    <div className={`w-64 ${bgColor} text-white p-5`}>

      <h2 className="text-2xl font-bold mb-10">
        {title}
      </h2>

      <nav className="flex flex-col gap-4">

        {links.map((link) => (
          <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `p-2 rounded transition ${
              isActive
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }`
          }
        >
            {link.label}
          </NavLink>
        ))}

      </nav>

    </div>
  );
}

export default Sidebar;