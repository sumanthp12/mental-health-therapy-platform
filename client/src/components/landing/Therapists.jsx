import { Link } from "react-router-dom";
import {
  Star,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const therapists = [
  {
    name: "Dr. Sarah Johnson",
    specialization: "Anxiety & Stress Management",
    experience: "8 Years",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dr. Michael Lee",
    specialization: "Depression & Trauma",
    experience: "10 Years",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Emily Carter",
    specialization: "Relationships & Family",
    experience: "7 Years",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

function Therapists() {
  return (
    <section
      id="therapists"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      <div
        className="
          absolute
          -top-40
          -left-40
          w-96
          h-96
          rounded-full
          bg-blue-100/40
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-40
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
            Our Therapists
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
            Professional support from
            <span className="block text-blue-600">
              people who care.
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
            Connect with qualified mental health professionals who can
            support you throughout your wellness journey.
          </p>

        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">

          {therapists.map((therapist) => (
            <div
              key={therapist.name}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
                hover:shadow-2xl
                hover:shadow-slate-900/10
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              <div className="relative overflow-hidden">

                <img
                  src={therapist.image}
                  alt={`${therapist.name} - ${therapist.specialization}`}
                  className="
                    w-full
                    h-72
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-slate-950/40
                    via-transparent
                    to-transparent
                    opacity-60
                  "
                />

                <div
                  className="
                    absolute
                    top-5
                    right-5
                    inline-flex
                    items-center
                    gap-1.5
                    px-3
                    py-2
                    rounded-full
                    bg-white/95
                    backdrop-blur-sm
                    text-sm
                    font-semibold
                    text-slate-800
                    shadow-lg
                  "
                >
                  <Star
                    size={15}
                    fill="currentColor"
                    className="text-yellow-500"
                  />

                  {therapist.rating}
                </div>

              </div>

              <div className="p-7">

                <h3
                  className="
                    text-xl
                    font-bold
                    text-slate-950
                  "
                >
                  {therapist.name}
                </h3>

                <p
                  className="
                    mt-2
                    text-slate-600
                    leading-relaxed
                  "
                >
                  {therapist.specialization}
                </p>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-5
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
                      rounded-lg
                      bg-blue-50
                    "
                  >
                    <Briefcase
                      size={16}
                      className="text-blue-600"
                    />
                  </div>

                  <span>
                    {therapist.experience} experience
                  </span>
                </div>

                <Link
                  to="/register"
                  className="
                    mt-7
                    w-full
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3.5
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    text-white
                    font-semibold
                    shadow-md
                    shadow-blue-500/15
                    hover:shadow-lg
                    hover:-translate-y-0.5
                    transition-all
                  "
                >
                  Get Started

                  <ArrowRight size={17} />
                </Link>

              </div>

            </div>
          ))}

        </div>

        <div
          className="
            mt-14
            lg:mt-16
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-7
            rounded-3xl
            border
            border-blue-100
            bg-gradient-to-r
            from-blue-50
            to-cyan-50
            px-7
            py-8
            lg:px-10
            lg:py-9
          "
        >

          <div className="flex items-start gap-4">

            <div
              className="
                flex
                items-center
                justify-center
                shrink-0
                w-12
                h-12
                rounded-2xl
                bg-white
                shadow-sm
              "
            >
              <ShieldCheck
                size={23}
                className="text-blue-600"
              />
            </div>

            <div>

              <h3
                className="
                  text-lg
                  lg:text-xl
                  font-bold
                  text-slate-950
                "
              >
                Not sure where to start?
              </h3>

              <p className="mt-1 text-slate-600">
                Create an account and we'll guide you through the next steps.
              </p>

            </div>

          </div>

          <Link
            to="/register"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              shrink-0
              px-6
              py-3.5
              rounded-xl
              bg-slate-950
              text-white
              font-semibold
              hover:bg-blue-600
              transition-colors
            "
          >
            Get Started

            <ArrowRight size={18} />

          </Link>

        </div>


        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-8
            gap-y-3
            mt-10
            text-sm
            text-slate-500
          "
        >

          <div className="flex items-center gap-2">
            <CheckCircle2
              size={16}
              className="text-green-600"
            />
            Qualified professionals
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2
              size={16}
              className="text-green-600"
            />
            Private sessions
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2
              size={16}
              className="text-green-600"
            />
            Personalized support
          </div>

        </div>

      </div>
    </section>
  );
}

export default Therapists;