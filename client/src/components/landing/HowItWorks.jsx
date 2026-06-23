import {
  UserPlus,
  ClipboardList,
  Calendar,
  Video,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Account",
    description:
      "Sign up securely and create your mental wellness profile.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Complete Intake Form",
    description:
      "Answer a few questions so we can understand your needs.",
  },
  {
    icon: Calendar,
    step: "03",
    title: "Book a Session",
    description:
      "Get matched with a therapist and schedule an appointment.",
  },
  {
    icon: Video,
    step: "04",
    title: "Start Therapy",
    description:
      "Attend secure video sessions and track your progress.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium mb-4">
            How It Works
          </span>

          <h2 className="text-5xl font-bold text-slate-900">
            Get Started In 4 Simple Steps
          </h2>

          <p className="mt-5 text-xl text-slate-600 max-w-3xl mx-auto">
            A simple and secure process designed to connect you with
            professional mental health support.
          </p>
        </div>

        {/* Steps */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="
                  relative
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >
                {/* Step Number */}

                <div className="absolute top-5 right-5 text-5xl font-bold text-slate-100">
                  {step.step}
                </div>

                {/* Icon */}

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center mb-6">
                  <Icon className="text-white" size={28} />
                </div>

                {/* Title */}

                <h3 className="text-xl font-bold mb-4">
                  {step.title}
                </h3>

                {/* Description */}

                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;