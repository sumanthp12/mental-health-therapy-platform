import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}

          <div>
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
              Mindful Connect
            </h2>

            <p className="text-slate-400">
              Empowering mental wellness through
              secure therapy, AI support,
              and meaningful connections.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="font-bold text-lg mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <a href="#features">Features</a>
              </li>

              <li>
                <a href="#how-it-works">How It Works</a>
              </li>

              <li>
                <a href="#therapists">Therapists</a>
              </li>

              <li>
                <a href="#faq">FAQ</a>
              </li>

            </ul>
          </div>

          {/* Services */}

          <div>
            <h3 className="font-bold text-lg mb-4">
              Services
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>Video Therapy</li>
              <li>AI Support</li>
              <li>Mental Assessments</li>
              <li>Progress Tracking</li>

            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="font-bold text-lg mb-4">
              Contact
            </h3>

            <div className="space-y-4 text-slate-400">

              <div className="flex items-center gap-3">
                <Mail size={18} />
                support@mindfulconnect.com
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                +91 9876543210
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                Mysuru, Karnataka, India
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}

        <div
          className="
            border-t border-slate-800
            mt-16 pt-8
            text-center
            text-slate-500
          "
        >
          © 2026 Mindful Connect. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;