import {
  Users,
  UserCheck,
  Video,
  Heart,
} from "lucide-react";

const stats = [
  {
    value: "500+",
    label: "Clients Supported",
    icon: Users,
  },
  {
    value: "50+",
    label: "Certified Therapists",
    icon: UserCheck,
  },
  {
    value: "1000+",
    label: "Sessions Conducted",
    icon: Video,
  },
  {
    value: "95%",
    label: "Satisfaction Rate",
    icon: Heart,
  },
];

function Stats() {
  return (
    <section className="relative bg-white py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            divide-x
            divide-slate-200
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-lg
            shadow-slate-900/5
            overflow-hidden
          "
        >

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  group
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  px-4
                  py-7
                  lg:py-8
                  hover:bg-blue-50/50
                  transition-colors
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    w-10
                    h-10
                    rounded-xl
                    bg-blue-50
                    mb-3
                    group-hover:bg-blue-100
                    transition-colors
                  "
                >
                  <Icon
                    size={19}
                    className="text-blue-600"
                  />
                </div>

                <p
                  className="
                    text-2xl
                    sm:text-3xl
                    lg:text-4xl
                    font-bold
                    text-slate-950
                  "
                >
                  {stat.value}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    sm:text-sm
                    text-slate-500
                  "
                >
                  {stat.label}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Stats;