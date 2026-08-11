import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/dashboardService";
import {
  Users,
  UserCheck,
  Calendar,
  IndianRupee,
  Clock,
} from "lucide-react";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import { showError } from "../../utils/toast";

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
  const [error, setError] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await getAdminDashboard();

      setStats(
        data?.stats || {
          clients: 0,
          therapists: 0,
          sessions: 0,
          revenue: 0,
        }
      );

      setDashboard(data || { upcomingSessions: [] });
    } catch (err) {
      console.error("Admin dashboard error:", err);

      setError(true);

      showError(
        err?.response?.data?.message ||
          "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        label="Loading admin dashboard..."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load dashboard"
        description="We couldn't load the admin dashboard right now. Please try again."
        onRetry={fetchDashboard}
        retryText="Reload Dashboard"
      />
    );
  }

  return (
    <div className="space-y-6">

      {/* Hero Section */}
      <div
        className="
          rounded-3xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          p-8
          text-white
          shadow-lg
        "
      >
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-blue-100">
          Monitor therapists, clients and platform growth.
        </p>
      </div>

      {/* Stats */}
      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* Clients */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <Users className="mb-3 text-blue-600" />

          <p className="text-slate-500">
            Total Clients
          </p>

          <h2 className="text-3xl font-bold text-slate-900">
            {stats.clients}
          </h2>
        </div>

        {/* Therapists */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <UserCheck className="mb-3 text-green-600" />

          <p className="text-slate-500">
            Therapists
          </p>

          <h2 className="text-3xl font-bold text-slate-900">
            {stats.therapists}
          </h2>
        </div>

        {/* Sessions */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <Calendar className="mb-3 text-purple-600" />

          <p className="text-slate-500">
            Sessions
          </p>

          <h2 className="text-3xl font-bold text-slate-900">
            {stats.sessions}
          </h2>
        </div>

        {/* Revenue */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <IndianRupee className="mb-3 text-orange-600" />

          <p className="text-slate-500">
            Revenue
          </p>

          <h2 className="text-3xl font-bold text-slate-900">
            ₹{stats.revenue}
          </h2>
        </div>

      </div>

      {/* Upcoming Sessions */}
      <div className="mt-6">

        <div className="rounded-3xl bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center gap-2">
            <Clock />

            <h3 className="text-xl font-bold">
              Upcoming Sessions
            </h3>
          </div>

          {dashboard?.upcomingSessions?.length > 0 ? (
            <div className="space-y-4">

              {dashboard.upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    py-4
                    last:border-b-0
                  "
                >

                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {session.client}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {session.therapist}
                    </p>
                  </div>

                  <div className="text-right">

                    <p className="font-medium text-blue-600">
                      {new Date(
                        session.date
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <p className="text-sm text-slate-500">
                      {new Date(
                        `1970-01-01T${session.time}`
                      ).toLocaleTimeString("en-IN", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <EmptyState
              icon={Clock}
              title="No upcoming sessions"
              description="There are no upcoming sessions scheduled at the moment."
            />
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;