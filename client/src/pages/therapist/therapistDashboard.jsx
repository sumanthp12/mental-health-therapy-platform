import { useEffect, useState } from "react";
import { Users, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getTherapistDashboard } from "../../services/dashboardService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/immutability
      loadDashboard();
    }
  }, [user]);

  const loadDashboard = async () => {
    try {
      const data = await getTherapistDashboard();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Therapist Dashboard
        </h1>

        <p className="mt-2 text-emerald-100">
          Manage your assigned clients and upcoming therapy sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <Users className="text-blue-600 mb-3" size={28} />
          <p className="text-slate-500">
            Assigned Clients
          </p>
          <h2 className="text-4xl font-bold mt-2">
            {dashboard.assignedClients}
          </h2>
        </div>
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <Clock className="text-purple-600 mb-3" size={28} />
          <p className="text-slate-500">
            Upcoming Sessions
          </p>
          <h2 className="text-4xl font-bold mt-2">
            {dashboard.upcomingSessions.length}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-5">
            Upcoming Sessions
          </h2>
          {dashboard.upcomingSessions.length === 0 ? (
            <p className="text-gray-500">
              No upcoming sessions.
            </p>
          ) : (
            <div className="space-y-4">
              {dashboard.upcomingSessions.map((session) => (
                <div
                  key={session._id}
                  className="border rounded-xl p-4"
                >
                  <h3 className="font-semibold">
                    {session.client?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(session.sessionDate).toLocaleString()}
                  </p>
                  <p className="text-sm capitalize text-gray-500 mt-1">
                    {session.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h2 className="text-2xl font-bold">
              Recently Assigned Clients
          </h2>
          <button
              onClick={() => navigate("/therapist/Clients")}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
              View All →
          </button>
          {dashboard.recentClients.length === 0 ? (
            <p className="text-gray-500">
              No assigned clients yet.
            </p>
          ) : (
            <div className="space-y-4">
              {dashboard.recentClients?.slice(0, 3).map((assignment) => (
                <div
                  key={assignment._id}
                  className="flex justify-between items-center border rounded-xl p-5"
                >
                  <div>
                    <h3 className="font-semibold">
                      {assignment.client?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {assignment.client?.email}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(
                      assignment.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;