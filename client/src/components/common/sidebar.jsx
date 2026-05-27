import { Link } from "react-router-dom";

function Sidebar({ title, links, bgColor }) {
  return (
    <div className={`w-64 ${bgColor} text-white p-5`}>

      <h2 className="text-2xl font-bold mb-10">
        {title}
      </h2>

      <nav className="flex flex-col gap-4">

        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="hover:bg-white hover:text-black p-2 rounded transition"
          >
            {link.label}
          </Link>
        ))}

      </nav>

    </div>
  );
}

export default Sidebar;