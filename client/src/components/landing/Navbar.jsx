import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className="
        sticky top-0 z-50
        bg-white/90
        backdrop-blur-md
        border-b border-slate-100
      "
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">

          <Link
            to="/"
            onClick={closeMenu}
            className="
              text-2xl md:text-3xl
              font-bold
              text-blue-600
              tracking-tight
              hover:text-blue-700
              transition-colors
            "
          >
            Mindful Connect
          </Link>

          <nav className="hidden md:flex items-center gap-10">

            <a
              href="#features"
              className="
                text-slate-700
                font-medium
                hover:text-blue-600
                transition-colors
              "
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="
                text-slate-700
                font-medium
                hover:text-blue-600
                transition-colors
              "
            >
              How It Works
            </a>

            <a
              href="#therapists"
              className="
                text-slate-700
                font-medium
                hover:text-blue-600
                transition-colors
              "
            >
              Therapists
            </a>

          </nav>

          <div className="hidden md:flex items-center gap-3">

            <Link
              to="/login"
              className="
                px-6 py-3
                rounded-xl
                border border-slate-300
                bg-white
                text-slate-800
                font-semibold
                hover:border-blue-300
                hover:bg-blue-50
                hover:text-blue-600
                transition-all
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                px-6 py-3
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                text-white
                font-semibold
                shadow-md
                shadow-blue-500/20
                hover:shadow-lg
                hover:shadow-blue-500/30
                hover:-translate-y-0.5
                transition-all
              "
            >
              Get Started
            </Link>

          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="
              md:hidden
              flex items-center justify-center
              w-11 h-11
              rounded-xl
              border border-slate-200
              bg-white
              text-slate-700
              hover:bg-slate-50
              transition
            "
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>

        {isMenuOpen && (
          <div
            className="
              md:hidden
              border-t border-slate-100
              py-5
            "
          >
            <nav className="flex flex-col gap-2">

              <a
                href="#features"
                onClick={closeMenu}
                className="
                  px-4 py-3
                  rounded-xl
                  text-slate-700
                  font-medium
                  hover:bg-blue-50
                  hover:text-blue-600
                  transition
                "
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={closeMenu}
                className="
                  px-4 py-3
                  rounded-xl
                  text-slate-700
                  font-medium
                  hover:bg-blue-50
                  hover:text-blue-600
                  transition
                "
              >
                How It Works
              </a>

              <a
                href="#therapists"
                onClick={closeMenu}
                className="
                  px-4 py-3
                  rounded-xl
                  text-slate-700
                  font-medium
                  hover:bg-blue-50
                  hover:text-blue-600
                  transition
                "
              >
                Therapists
              </a>

              <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-slate-100">

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="
                    w-full
                    text-center
                    px-6 py-3
                    rounded-xl
                    border border-slate-300
                    bg-white
                    text-slate-800
                    font-semibold
                    hover:bg-blue-50
                    hover:text-blue-600
                    transition
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="
                    w-full
                    text-center
                    px-6 py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    text-white
                    font-semibold
                    shadow-md
                    shadow-blue-500/20
                    hover:shadow-lg
                    transition
                  "
                >
                  Get Started
                </Link>

              </div>

            </nav>
          </div>
        )}

      </div>
    </header>
  );
}

export default Navbar;