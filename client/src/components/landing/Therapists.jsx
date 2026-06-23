import { Star, Briefcase, ArrowRight } from "lucide-react";

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
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium mb-4">
            Our Therapists
          </span>

          <h2 className="text-5xl font-bold">
            Meet Our Experts
          </h2>

          <p className="mt-5 text-xl text-slate-600 max-w-3xl mx-auto">
            Certified mental health professionals dedicated to
            supporting your wellness journey.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {therapists.map((therapist, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                border
                border-slate-100
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <img
                src={therapist.image}
                alt={therapist.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-8">

                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">
                    {therapist.name}
                  </h3>

                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    {therapist.rating}
                  </div>
                </div>

                <p className="text-slate-600 mb-4">
                  {therapist.specialization}
                </p>

                <div className="flex items-center gap-2 text-slate-500 mb-6">
                  <Briefcase size={16} />
                  {therapist.experience} Experience
                </div>

                <button
                  className="
                    w-full
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                    hover:opacity-90
                    transition
                  "
                >
                  Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="text-center mt-16">
          <button
            className="
              inline-flex
              items-center
              gap-2
              px-8
              py-4
              rounded-xl
              border
              border-slate-300
              font-semibold
              hover:bg-slate-100
              transition
            "
          >
            View All Therapists
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Therapists;