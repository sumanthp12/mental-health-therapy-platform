import { ArrowRight, Calendar, Brain, Video } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6">
              Mental Wellness Platform
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900">
              Your Mental
              <span className="block text-blue-600">
                Wellness Journey
              </span>
              Starts Here
            </h1>

            <p className="mt-8 text-xl text-slate-600 leading-relaxed">
              Connect with certified therapists, attend secure online
              sessions, and receive professional mental health support
              from anywhere.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 transition">
                Book Session
              </button>

              <button className="px-8 py-4 rounded-xl border border-slate-300 bg-white font-semibold hover:bg-slate-100 transition flex items-center gap-2">
                Explore Therapists
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="flex gap-8 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  500+
                </h3>
                <p className="text-slate-600">
                  Clients Supported
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  50+
                </h3>
                <p className="text-slate-600">
                  Therapists
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  95%
                </h3>
                <p className="text-slate-600">
                  Satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="bg-white rounded-3xl p-8 shadow-2xl">

              <h3 className="text-2xl font-bold mb-8">
                Mental Wellness Platform
              </h3>

              <div className="space-y-5">

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-blue-50">
                  <Video className="text-blue-600" />
                  <span className="font-medium">
                    Secure Video Sessions
                  </span>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-green-50">
                  <Brain className="text-green-600" />
                  <span className="font-medium">
                    AI Mental Health Support
                  </span>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-purple-50">
                  <Calendar className="text-purple-600" />
                  <span className="font-medium">
                    Easy Session Scheduling
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Card 1 */}

            <div className="hidden lg:block absolute -top-6 -left-12 bg-white p-5 rounded-2xl shadow-lg">
              <p className="text-sm text-slate-500">
                Sessions Completed
              </p>
              <h3 className="text-3xl font-bold text-blue-600">
                1000+
              </h3>
            </div>

            {/* Floating Card 2 */}

            <div className="hidden lg:block absolute -bottom-6 -right-8 bg-white p-5 rounded-2xl shadow-lg">
              <p className="text-sm text-slate-500">
                Satisfaction Rate
              </p>
              <h3 className="text-3xl font-bold text-green-600">
                95%
              </h3>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;