function Stats() {
  const stats = [
    { value: "500+", label: "Clients Supported" },
    { value: "50+", label: "Certified Therapists" },
    { value: "1000+", label: "Sessions Conducted" },
    { value: "95%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="bg-white py-16">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-blue-600">
              {stat.value}
            </h2>

            <p className="text-gray-600 mt-2">
              {stat.label}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Stats;