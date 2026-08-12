import {
  Brain,
  Video,
  MessageCircle,
  Calendar,
  Shield,
  ArrowUpRight,
  Check,
} from "lucide-react";

const features = [
  {
    title: "AI Mental Health Assistant",
    icon: Brain,
    description:
      "Get instant AI-powered support, guidance, and wellness conversations whenever you need them.",
    points: [
      "Available anytime",
      "Personalized conversations",
    ],
    featured: true,
  },
  {
    title: "Secure Video Sessions",
    icon: Video,
    description:
      "Connect privately with your assigned therapist through secure online therapy sessions.",
  },
  {
    title: "Real-Time Messaging",
    icon: MessageCircle,
    description:
      "Stay connected with your therapist through private and convenient messaging.",
  },
  {
    title: "Smart Scheduling",
    icon: Calendar,
    description:
      "Manage therapy appointments and keep track of your upcoming sessions with ease.",
  },
  {
    title: "Data Privacy",
    icon: Shield,
    description:
      "Your personal information and therapy data are protected with secure access controls.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      {/* Background decoration */}
      <div className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute bottom-10 -right-40 w-80 h-80 rounded-full bg-cyan-100/40 blur-3xl" />
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
            Everything You Need
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
            Support designed around
            <span className="block text-blue-600">
              your wellness journey.
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
            From connecting with your therapist to managing sessions and
            accessing AI-powered support, Mindful Connect brings everything
            together in one secure platform.
          </p>

        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  transition-all
                  duration-300
                  ${
                    feature.featured
                      ? `
                        lg:col-span-2
                        bg-gradient-to-br
                        from-blue-600
                        to-cyan-500
                        border-blue-500
                        text-white
                        shadow-xl
                        shadow-blue-500/15
                      `
                      : `
                        bg-white
                        border-slate-200
                        hover:border-blue-200
                        hover:shadow-xl
                        hover:shadow-slate-900/5
                        hover:-translate-y-1
                      `
                  }
                `}
              >

                {feature.featured && (
                  <>
                    <div
                      className="
                        absolute
                        -top-24
                        -right-24
                        w-64
                        h-64
                        rounded-full
                        bg-white/10
                      "
                    />

                    <div
                      className="
                        absolute
                        -bottom-32
                        left-1/3
                        w-72
                        h-72
                        rounded-full
                        bg-white/5
                      "
                    />
                  </>
                )}

                <div className="relative p-7 lg:p-8 h-full">
                  <div className="flex items-start justify-between">
                    <div
                      className={`
                        flex
                        items-center
                        justify-center
                        w-14
                        h-14
                        rounded-2xl
                        ${
                          feature.featured
                            ? "bg-white/15"
                            : "bg-blue-50"
                        }
                      `}
                    >
                      <Icon
                        size={25}
                        className={
                          feature.featured
                            ? "text-white"
                            : "text-blue-600"
                        }
                      />
                    </div>
                    <div
                      className={`
                        flex
                        items-center
                        justify-center
                        w-9
                        h-9
                        rounded-full
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        ${
                          feature.featured
                            ? "bg-white/10"
                            : "bg-slate-50"
                        }
                      `}
                    >
                      <ArrowUpRight
                        size={18}
                        className={
                          feature.featured
                            ? "text-white"
                            : "text-slate-500"
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3
                      className={`
                        text-2xl
                        font-bold
                        ${
                          feature.featured
                            ? "text-white"
                            : "text-slate-950"
                        }
                      `}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`
                        mt-4
                        leading-relaxed
                        ${
                          feature.featured
                            ? "text-blue-50"
                            : "text-slate-600"
                        }
                      `}
                    >
                      {feature.description}
                    </p>
                    {feature.featured && (
                      <div className="flex flex-wrap gap-3 mt-7">

                        {feature.points.map((point) => (
                          <div
                            key={point}
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-3
                              py-2
                              rounded-full
                              bg-white/10
                              text-sm
                              text-white
                            "
                          >
                            <Check size={15} />

                            {point}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-3
            mt-12
            text-center
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
            <Shield
              size={16}
              className="text-green-600"
            />
          </div>
          <p>
            Built with privacy, security, and meaningful support in mind.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;