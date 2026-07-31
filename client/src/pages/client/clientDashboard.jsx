import {
  Calendar,
  UserRound,
  MessageCircle,
  Brain,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClientDashboard } from "../../services/dashboardService";

function ClientDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const data = await getClientDashboard();
      setDashboard(data);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-blue-100">
          Stay consistent with your therapy journey and keep making progress.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Therapist */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Assigned Therapist
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                {dashboard?.assignedTherapist?.user?.name || "Not Assigned"}
              </h2>
              <p className="mt-1 text-slate-500">
                {dashboard?.assignedTherapist?.specialization || "-"}
              </p>
            </div>
            <UserRound
              size={48}
              className="text-blue-600"
            />
          </div>
          <button
            onClick={() => navigate("/client/my-therapist")}
            className="mt-4 flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
          >
            View Profile
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Sessions */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Upcoming Sessions
              </p>
              <h2 className="mt-1 text-4xl font-bold">
                {dashboard?.upcomingSessions?.length || 0}
              </h2>
            </div>
            <Calendar
              size={48}
              className="text-green-600"
            />
          </div>
          <button
            onClick={() => navigate("/client/sessions")}
            className="mt-4 flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
          >
            View Sessions
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Next Session */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold">
            Next Session
          </h2>
          {dashboard?.nextSession ? (
            <>
              <p className="text-lg font-semibold">
                {new Date(
                  dashboard.nextSession.sessionDate
                ).toLocaleDateString()}
              </p>
              <p className="mt-1 text-slate-500">
                {dashboard.nextSession.sessionTime}
              </p>
              <button
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
              >
                Join Session
              </button>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <Calendar
                className="mx-auto mb-4 text-slate-400"
                size={42}
              />
              <p className="text-slate-500">
                No upcoming sessions scheduled.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/client/my-therapist")}
              className="rounded-2xl border p-5 text-left transition hover:bg-blue-50"
            >
              <UserRound className="mb-3 text-blue-600" />
              <p className="font-semibold">
                My Therapist
              </p>
            </button>
            <button
              onClick={() => navigate("/client/messages")}
              className="rounded-2xl border p-5 text-left transition hover:bg-blue-50"
            >
              <MessageCircle className="mb-3 text-green-600" />
              <p className="font-semibold">
                Messages
              </p>
            </button>
            <button
              onClick={() => navigate("/client/sessions")}
              className="rounded-2xl border p-5 text-left transition hover:bg-blue-50"
            >
              <Calendar className="mb-3 text-purple-600" />
              <p className="font-semibold">
                Sessions
              </p>
            </button>
            <button
              onClick={() => navigate("/client/ai-support")}
              className="rounded-2xl border p-5 text-left transition hover:bg-blue-50"
            >
              <Brain className="mb-3 text-pink-600" />
              <p className="font-semibold">
                AI Support
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;