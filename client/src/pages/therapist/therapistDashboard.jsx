import {
  Users,
  Calendar,
  IndianRupee,
  ClipboardList,
  Clock,
  Activity,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Hero */}
      <div
        className="
        bg-gradient-to-r
        from-emerald-500
        to-teal-500
        rounded-3xl
        p-8
        text-white
        shadow-lg
      "
      >
        <h1 className="text-4xl font-bold">
          Therapist Dashboard
        </h1>

        <p className="mt-2 text-emerald-100">
          Manage clients, sessions and therapy outcomes.
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
          <Users className="text-blue-600 mb-3" />
          <p className="text-slate-500">Assigned Clients</p>
          <h2 className="text-3xl font-bold">18</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <Calendar className="text-purple-600 mb-3" />
          <p className="text-slate-500">Today's Sessions</p>
          <h2 className="text-3xl font-bold">6</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <ClipboardList className="text-orange-600 mb-3" />
          <p className="text-slate-500">Pending Notes</p>
          <h2 className="text-3xl font-bold">4</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <IndianRupee className="text-green-600 mb-3" />
          <p className="text-slate-500">Monthly Earnings</p>
          <h2 className="text-3xl font-bold">₹28,000</h2>
        </div>
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock />
            <h3 className="font-bold text-xl">
              Upcoming Sessions
            </h3>
          </div>

          <div className="space-y-3">
            <p>John Doe — 4:00 PM</p>
            <p>Priya Sharma — 6:00 PM</p>
            <p>Rahul Kumar — Tomorrow</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity />
            <h3 className="font-bold text-xl">
              Recent Activity
            </h3>
          </div>

          <div className="space-y-3">
            <p>Session completed</p>
            <p>Client assigned</p>
            <p>Progress notes updated</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;