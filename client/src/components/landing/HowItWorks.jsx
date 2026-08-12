import {
  UserPlus,
  ClipboardList,
  Calendar,
  Video,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Account",
    description:
      "Sign up securely and create your personalized mental wellness profile.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Complete Your Intake",
    description:
      "Share a few details about yourself and your wellness needs through our intake form.",
  },
  {
    icon: Calendar,
    step: "03",
    title: "Connect With Your Therapist",
    description:
      "Your assigned therapist will help you schedule and manage your therapy sessions.",
  },
  {
    icon: Video,
    step: "04",
    title: "Start Your Sessions",
    description:
      "Attend secure online therapy sessions and stay connected throughout your journey.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-slate-50 py-24 lg:py-32"
    >


      <div
        className="
          absolute
          -top-40
          -right-40
          w-96
          h-96
          rounded-full
          bg-blue-100/50
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -left-40
          w-96
          h-96
          rounded-full
          bg-cyan-100/40
          blur-3xl
        "
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">


        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">

          <span
            className="
              inline-flex
              items-center
              px-4
              py-2
              rounded-full
              bg-blue-100
              text-blue-700
              text-sm
              font-semibold
            "
          >
            How It Works
          </span>

          <h2
            className="
              mt-6
              text-4xl
              sm:text-5xl
              lg:text-6xl
              font-bold
              tracking-tight
              text-slate-950
            "
          >
            Getting started is
            <span className="block text-blue-600">
              simple and straightforward.
            </span>
          </h2>

          <p
            className="
              mt-6
              text-lg
              lg:text-xl
              leading-relaxed
              text-slate-600
            "
          >
            Follow a simple process designed to help you connect with
            professional mental health support without unnecessary complexity.
          </p>

        </div>

        <div className="relative">

          {/* Connecting Line — Desktop */}

          <div
            className="
              hidden
              lg:block
              absolute
              top-[4.5rem]
              left-[12.5%]
              right-[12.5%]
              h-px
              bg-gradient-to-r
              from-blue-200
              via-cyan-200
              to-blue-200
            "
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.step}
                  className="
                    group
                    relative
                    bg-white
                    rounded-3xl
                    border
                    border-slate-200
                    p-7
                    lg:p-8
                    shadow-sm
                    hover:shadow-xl
                    hover:shadow-slate-900/5
                    hover:-translate-y-1
                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      relative
                      z-10
                      flex
                      items-center
                      justify-between
                      mb-8
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-center
                        w-16
                        h-16
                        rounded-2xl
                        bg-gradient-to-br
                        from-blue-600
                        to-cyan-500
                        shadow-lg
                        shadow-blue-500/20
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      "
                    >
                      <Icon
                        size={27}
                        className="text-white"
                      />
                    </div>

                    <span
                      className="
                        text-5xl
                        font-bold
                        tracking-tight
                        text-slate-100
                        select-none
                      "
                    >
                      {step.step}
                    </span>

                  </div>


                  <h3
                    className="
                      text-xl
                      lg:text-2xl
                      font-bold
                      text-slate-950
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      text-slate-600
                      leading-relaxed
                    "
                  >
                    {step.description}
                  </p>


                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mt-7
                      text-sm
                      font-medium
                      text-blue-600
                    "
                  >
                    <CheckCircle2 size={17} />

                    Step {step.step}

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        <div
          className="
            relative
            mt-16
            lg:mt-20
            overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-7
            py-10
            lg:px-12
            lg:py-12
            text-center
            shadow-xl
            shadow-blue-500/15
          "
        >

          <div
            className="
              absolute
              -top-20
              -right-20
              w-52
              h-52
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              -bottom-24
              -left-20
              w-60
              h-60
              rounded-full
              bg-white/10
            "
          />

          <div className="relative">

            <h3
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                text-white
              "
            >
              Ready to take the first step?
            </h3>

            <p
              className="
                max-w-2xl
                mx-auto
                mt-4
                text-blue-50
                text-base
                lg:text-lg
              "
            >
              Create your account and begin your personalized mental
              wellness journey with Mindful Connect.
            </p>

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                mt-7
                px-7
                py-3.5
                rounded-xl
                bg-white
                text-blue-600
                font-semibold
                hover:bg-blue-50
                hover:-translate-y-0.5
                transition-all
                shadow-lg
              "
            >
              Get Started

              <ArrowRight size={18} />

            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;