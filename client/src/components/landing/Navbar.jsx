import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-md
        bg-white/80
        border-b border-slate-100
      "
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="text-3xl font-bold text-blue-600"
          >
            Mindful Connect
          </Link>

          {/* Menu */}

          <nav className="hidden md:flex items-center gap-10">

            <a href="#features" className="hover:text-blue-600">
              Features
            </a>

            <a href="#how-it-works" className="hover:text-blue-600">
              How It Works
            </a>

            <a href="#therapists" className="hover:text-blue-600">
              Therapists
            </a>

            {/* <a href="#testimonials" className="hover:text-blue-600">
              Testimonials
            </a>

            <a href="#faq" className="hover:text-blue-600">
              FAQ
            </a> */}
          </nav>

          {/* Buttons */}

          <div className="flex items-center gap-4">

            <Link
              className="
                px-6 py-3
                rounded-xl
                border
                border-slate-300
                font-medium
              "
            >
              Login
            </Link>

            <Link
              className="
                px-6 py-3
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                text-white
                font-medium
              "
            >
              Get Started
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;