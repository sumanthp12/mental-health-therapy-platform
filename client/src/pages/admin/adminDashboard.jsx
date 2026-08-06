import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/dashboardService";
import {
  Users,
  UserCheck,
  Calendar,
  IndianRupee,
  Clock,
} from "lucide-react";

function Dashboard() {

  const [stats, setStats] = useState({
    clients: 0,
    therapists: 0,
    sessions: 0,
    revenue: 0,
  });

  const [dashboard, setDashboard] = useState({
    upcomingSessions: [],
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const data = await getAdminDashboard();

      console.log("Dashboard API:", data);

      setStats(data.stats);
      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);

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
          <h2 className="text-3xl font-bold">{loading ? "..." : stats.clients}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <UserCheck className="text-green-600 mb-3" />
          <p className="text-slate-500">Therapists</p>
          <h2 className="text-3xl font-bold">{loading ? "..." : stats.therapists}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <Calendar className="text-purple-600 mb-3" />
          <p className="text-slate-500">Sessions</p>
          <h2 className="text-3xl font-bold">{loading ? "..." : stats.sessions}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <IndianRupee className="text-orange-600 mb-3" />
          <p className="text-slate-500">Revenue</p>
          <h2 className="text-3xl font-bold">₹{loading ? "..." : stats.revenue}</h2>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="mt-6">

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
            {dashboard?.upcomingSessions?.length > 0 ? (
              dashboard.upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex justify-between items-center border-b last:border-b-0 py-4"
                >
                  <div>
                    <h4 className="font-semibold">
                      {session.client}
                    </h4>

                    <p className="text-gray-500 text-sm">
                      {session.therapist}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-blue-600">
                      {new Date(session.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <p className="text-sm text-gray-500">
                      {new Date(`1970-01-01T${session.time}`).toLocaleTimeString("en-IN", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No upcoming sessions
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;