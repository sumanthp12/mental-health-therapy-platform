import {
  Users,
  UserCheck,
  Calendar,
  IndianRupee,
  Activity,
  Clock,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Hero Section */}
      <div className="
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        rounded-3xl
        p-8
        text-white
        shadow-lg
      ">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-blue-100">
          Monitor therapists, clients and platform growth.
        </p>
      </div>

      {/* Stats */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <Users className="text-blue-600 mb-3" />
          <p className="text-slate-500">Total Clients</p>
          <h2 className="text-3xl font-bold">120</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <UserCheck className="text-green-600 mb-3" />
          <p className="text-slate-500">Therapists</p>
          <h2 className="text-3xl font-bold">18</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <Calendar className="text-purple-600 mb-3" />
          <p className="text-slate-500">Sessions</p>
          <h2 className="text-3xl font-bold">95</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <IndianRupee className="text-orange-600 mb-3" />
          <p className="text-slate-500">Revenue</p>
          <h2 className="text-3xl font-bold">₹85,000</h2>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      ">

        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
        ">
          <div className="flex items-center gap-2 mb-4">
            <Activity />
            <h3 className="font-bold text-xl">
              Recent Activity
            </h3>
          </div>

          <div className="space-y-4">

            <div className="border-b pb-3">
              New client registered
            </div>

            <div className="border-b pb-3">
              Session approved
            </div>

            <div className="border-b pb-3">
              Payment received
            </div>

            <div>
              Therapist profile updated
            </div>

          </div>
        </div>

        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
        ">
          <div className="flex items-center gap-2 mb-4">
            <Clock />
            <h3 className="font-bold text-xl">
              Upcoming Sessions
            </h3>
          </div>

          <div className="space-y-4">

            <div className="border-b pb-3">
              John Doe — Today 4 PM
            </div>

            <div className="border-b pb-3">
              Priya Sharma — Today 6 PM
            </div>

            <div>
              Rahul Kumar — Tomorrow 10 AM
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;