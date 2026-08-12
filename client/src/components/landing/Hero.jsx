import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Brain,
  Video,
  ShieldCheck,
  MessageCircle,
  Sparkles,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">

      {/* Background Decorations */}

      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="absolute top-1/3 left-1/2 w-24 h-24 rounded-full bg-blue-100/40 blur-2xl" />

      {/* Main Container */}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-20 items-center">

          {/* =======================================================
              LEFT CONTENT
          ======================================================== */}

          <div className="max-w-2xl">

            {/* Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-blue-100
                text-blue-700
                text-sm
                font-semibold
                mb-7
              "
            >
              <Sparkles size={16} />

              Mental Wellness Platform
            </div>

            {/* Heading */}

            <h1
              className="
                text-5xl
                sm:text-6xl
                lg:text-7xl
                font-bold
                leading-[1.05]
                tracking-tight
                text-slate-950
              "
            >
              Your Mental

              <span className="block text-blue-600">
                Wellness Journey
              </span>

              Starts Here
            </h1>

            {/* Description */}

            <p
              className="
                mt-7
                max-w-xl
                text-lg
                lg:text-xl
                leading-relaxed
                text-slate-600
              "
            >
              Connect with certified therapists, attend secure online
              sessions, and receive professional mental health support
              from anywhere.
            </p>

            {/* CTA Buttons */}

            <div className="flex flex-col sm:flex-row gap-4 mt-9">

              {/* Primary CTA */}

              <Link
                to="/register"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-7
                  py-4
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  text-white
                  font-semibold
                  shadow-lg
                  shadow-blue-500/20
                  hover:shadow-xl
                  hover:shadow-blue-500/30
                  hover:-translate-y-0.5
                  transition-all
                "
              >
                Book a Session

                <ArrowRight size={19} />
              </Link>

              {/* Secondary CTA */}

              <a
                href="#therapists"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-7
                  py-4
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  text-slate-800
                  font-semibold
                  hover:border-blue-300
                  hover:bg-blue-50
                  hover:text-blue-600
                  transition-all
                "
              >
                Explore Therapists

                <ArrowRight size={19} />
              </a>

            </div>

            {/* Trust Message */}

            <div
              className="
                flex
                items-center
                gap-3
                mt-7
                text-sm
                text-slate-500
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-8
                  h-8
                  rounded-full
                  bg-green-100
                "
              >
                <ShieldCheck
                  size={17}
                  className="text-green-600"
                />
              </div>

              <span>
                Secure, private and confidential support
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              className="
                relative
                bg-white
                rounded-[2rem]
                p-7
                sm:p-9
                shadow-2xl
                shadow-slate-900/10
                border
                border-white
              "
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Your Wellness Space
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-950">
                    Mindful Connect
                  </h2>
                </div>
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    w-12
                    h-12
                    rounded-2xl
                    bg-blue-100
                  "
                >
                  <Brain
                    size={24}
                    className="text-blue-600"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    p-5
                    rounded-2xl
                    bg-blue-50
                    border
                    border-blue-100
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-11
                      h-11
                      rounded-xl
                      bg-white
                    "
                  >
                    <Video
                      size={21}
                      className="text-blue-600"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Secure Video Sessions
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Connect with your therapist online
                    </p>
                  </div>
                </div>
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    p-5
                    rounded-2xl
                    bg-green-50
                    border
                    border-green-100
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-11
                      h-11
                      rounded-xl
                      bg-white
                    "
                  >
                    <Brain
                      size={21}
                      className="text-green-600"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      AI Mental Health Support
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Support whenever you need it
                    </p>
                  </div>
                </div>
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    p-5
                    rounded-2xl
                    bg-purple-50
                    border
                    border-purple-100
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-11
                      h-11
                      rounded-xl
                      bg-white
                    "
                  >
                    <MessageCircle
                      size={21}
                      className="text-purple-600"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Private Messaging
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Stay connected with your therapist
                    </p>
                  </div>
                </div>
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    p-5
                    rounded-2xl
                    bg-orange-50
                    border
                    border-orange-100
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-11
                      h-11
                      rounded-xl
                      bg-white
                    "
                  >
                    <Calendar
                      size={21}
                      className="text-orange-600"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Easy Session Scheduling
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Manage your therapy appointments
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="
                hidden
                lg:block
                absolute
                -top-7
                -left-12
                bg-white
                rounded-2xl
                px-5
                py-4
                shadow-xl
                shadow-slate-900/10
                border
                border-slate-100
              "
            >

              <p className="text-xs text-slate-500">
                Sessions Completed
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-600">
                1000+
              </p>

            </div>


            <div
              className="
                hidden
                lg:block
                absolute
                -bottom-7
                -right-8
                bg-white
                rounded-2xl
                px-5
                py-4
                shadow-xl
                shadow-slate-900/10
                border
                border-slate-100
              "
            >

              <p className="text-xs text-slate-500">
                Satisfaction Rate
              </p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                95%
              </p>

            </div>

            <div
              className="
                hidden
                sm:flex
                absolute
                -bottom-12
                left-6
                items-center
                gap-3
                bg-white
                rounded-2xl
                px-4
                py-3
                shadow-lg
                border
                border-slate-100
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-9
                  h-9
                  rounded-xl
                  bg-green-100
                "
              >
                <ShieldCheck
                  size={18}
                  className="text-green-600"
                />
              </div>

              <div>

                <p className="text-xs text-slate-500">
                  Your privacy matters
                </p>

                <p className="text-sm font-semibold text-slate-900">
                  Secure & Private
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;