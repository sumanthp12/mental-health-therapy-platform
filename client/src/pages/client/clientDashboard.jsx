import {
  Calendar,
  Brain,
  Heart,
  CreditCard,
  UserRound,
  Sparkles,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Wellness Banner */}
      <div
        className="
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        rounded-3xl
        p-8
        text-white
        shadow-lg
      "
      >
        <h1 className="text-4xl font-bold">
          Your Wellness Journey
        </h1>

        <p className="mt-2 text-blue-100">
          Stay consistent with your therapy and self-care goals.
        </p>
      </div>

      {/* Stats */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
      >
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <Calendar className="text-blue-600 mb-3" />
          <p className="text-slate-500">Completed Sessions</p>
          <h2 className="text-3xl font-bold">12</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <Heart className="text-pink-600 mb-3" />
          <p className="text-slate-500">Mood Score</p>
          <h2 className="text-3xl font-bold">8.4/10</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <Brain className="text-purple-600 mb-3" />
          <p className="text-slate-500">AI Interactions</p>
          <h2 className="text-3xl font-bold">28</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <CreditCard className="text-green-600 mb-3" />
          <p className="text-slate-500">Payments</p>
          <h2 className="text-3xl font-bold">₹4,000</h2>
        </div>
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4">
            Upcoming Appointment
          </h3>

          <div className="flex items-center gap-4">
            <UserRound size={50} />
            <div>
              <p className="font-semibold">
                Dr. Sarah Wilson
              </p>
              <p className="text-slate-500">
                Tomorrow • 5:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4">
            AI Support
          </h3>

          <div className="flex items-center gap-3">
            <Sparkles className="text-blue-600" />
            <p>
              Need immediate guidance? Talk with AI Support.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;