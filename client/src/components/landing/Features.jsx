import {
  Brain,
  Video,
  MessageCircle,
  Calendar,
  Shield,
  BarChart,
} from "lucide-react";

const features = [
  {
    title: "AI Mental Health Assistant",
    icon: Brain,
    description:
      "24/7 AI-powered emotional support and guidance.",
  },
  {
    title: "Secure Video Sessions",
    icon: Video,
    description:
      "Private online therapy sessions with certified therapists.",
  },
  {
    title: "Real-Time Messaging",
    icon: MessageCircle,
    description:
      "Chat securely with your therapist anytime.",
  },
  {
    title: "Smart Scheduling",
    icon: Calendar,
    description:
      "Book appointments effortlessly.",
  },
  {
    title: "Data Privacy",
    icon: Shield,
    description:
      "End-to-end secure healthcare-grade protection.",
  },
  {
    title: "Progress Tracking",
    icon: BarChart,
    description:
      "Monitor your mental wellness journey.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold">
            Why Choose Mindful Connect?
          </h2>

          <p className="mt-5 text-xl text-slate-600">
            Everything you need for a better mental wellness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                  p-8
                  rounded-3xl
                  border
                  border-slate-100
                  bg-white
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition
                  duration-300
                "
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                  <Icon className="text-blue-600" />
                </div>

                <h3 className="text-xl font-bold mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;