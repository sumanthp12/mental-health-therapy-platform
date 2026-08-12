import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  ShieldCheck,
} from "lucide-react";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 lg:pt-24">
        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-7
            py-12
            lg:px-14
            lg:py-14
            text-center
          "
        >

          {/* Decorative circles */}

          <div
            className="
              absolute
              -top-28
              -right-24
              w-72
              h-72
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              -bottom-32
              -left-24
              w-80
              h-80
              rounded-full
              bg-white/10
            "
          />

          <div className="relative max-w-3xl mx-auto">

            <div
              className="
                inline-flex
                items-center
                justify-center
                w-12
                h-12
                rounded-2xl
                bg-white/15
                mb-5
              "
            >
              <ShieldCheck size={24} />
            </div>

            <h2
              className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-bold
                tracking-tight
              "
            >
              Ready to take the first step?
            </h2>

            <p
              className="
                mt-5
                text-blue-50
                text-base
                sm:text-lg
                leading-relaxed
              "
            >
              Create your account and begin your personalized
              mental wellness journey with Mindful Connect.
            </p>

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                mt-8
                px-7
                py-3.5
                rounded-xl
                bg-white
                text-blue-600
                font-semibold
                shadow-lg
                hover:bg-blue-50
                hover:-translate-y-0.5
                transition-all
              "
            >
              Get Started

              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="
                inline-block
                text-2xl
                font-bold
                text-white
                hover:text-blue-400
                transition-colors
              "
            >
              Mindful Connect
            </Link>
            <p
              className="
                mt-5
                text-slate-400
                leading-relaxed
                max-w-sm
              "
            >
              A mental wellness platform designed to help clients
              connect with professional support and manage their
              therapy journey.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="
                    text-slate-400
                    hover:text-white
                    transition-colors
                  "
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="
                    text-slate-400
                    hover:text-white
                    transition-colors
                  "
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#therapists"
                  className="
                    text-slate-400
                    hover:text-white
                    transition-colors
                  "
                >
                  Therapists
                </a>
              </li>
              <li>
                <Link
                  to="/register"
                  className="
                    text-slate-400
                    hover:text-white
                    transition-colors
                  "
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-5">
              Platform
            </h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                Secure Video Sessions
              </li>
              <li>
                Therapist Messaging
              </li>
              <li>
                AI Mental Health Support
              </li>
              <li>
                Session Management
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-5">
              Contact
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:support@mindfulconnect.com"
                className="
                  flex
                  items-start
                  gap-3
                  text-slate-400
                  hover:text-white
                  transition-colors
                "
              >
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0"
                />
                <span className="break-all">
                  support@mindfulconnect.com
                </span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
            border-t
            border-slate-800
            mt-16
            pt-8
          "
        >

          <p className="text-sm text-slate-500">
            © 2026 Mindful Connect. All Rights Reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-slate-500">

            <ShieldCheck size={15} />

            <span>
              Built for mental wellness
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;