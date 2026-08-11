import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  UserRound,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { findOrCreateConversation } from "../../services/chatService";
import ScheduleSessionModal from "../../components/sessions/ScheduleSessionModal";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

import { showError } from "../../utils/toast";

function Clients() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [assignedClients, setAssignedClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);  

const fetchAssignedClients = async () => {
  try {
    setLoading(true);
    setError(false);

    const response = await fetch(
      `http://localhost:8000/api/assignments/therapist/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ||
          "Unable to load assigned clients."
      );
    }

    setAssignedClients(
      Array.isArray(data) ? data : []
    );
  } catch (error) {
    console.error(
      "Failed to load assigned clients:",
      error
    );

    setError(true);

    showError(
      error?.message ||
        "Unable to load assigned clients."
    );
  } finally {
    setLoading(false);
  }
};

const handleMessage = async (clientId) => {
  try {
    const conversation =
      await findOrCreateConversation(clientId);

    navigate(
      `/therapist/messages?id=${conversation._id}`
    );
  } catch (error) {
    console.error(
      "Failed to start conversation:",
      error
    );

    showError(
      error?.response?.data?.message ||
        "Unable to start the conversation. Please try again."
    );
  }
};

const handleSchedule = (assignment) => {
    setSelectedClient(assignment.client);
    setShowScheduleModal(true);
  };

  useEffect(() => {
    if (user?.id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchAssignedClients();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const filteredClients = assignedClients.filter((assignment) =>
    assignment.client?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

if (loading) {
  return (
    <LoadingSpinner
      fullScreen
      label="Loading assigned clients..."
    />
  );
}

if (error) {
  return (
    <ErrorState
      title="Unable to load assigned clients"
      description="We couldn't load your assigned clients right now. Please try again."
      onRetry={fetchAssignedClients}
      retryText="Reload Clients"
    />
  );
}

  return (
    <div className="space-y-6">


      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-3xl font-bold">Assigned Clients</h1>
        <p className="text-gray-500 mt-2">
          View and manage your assigned clients.
        </p>
      </div>


      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search client..."
            className="w-full border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {assignedClients.length === 0 ? (
        <div className="rounded-2xl bg-white shadow-sm">
          <EmptyState
            icon={UserRound}
            title="No assigned clients"
            description="Clients assigned to you will appear here once an administrator assigns them."
          />
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="rounded-2xl bg-white shadow-sm">
          <EmptyState
            icon={Search}
            title="No clients found"
            description={`No clients match "${searchTerm}". Try a different search term.`}
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">
                    Client
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-left">
                    Concern
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map(
                  (assignment) => (
                    <tr
                      key={assignment._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium">
                        {assignment.client?.name}
                      </td>

                      <td className="p-4">
                        {assignment.client?.email}
                      </td>

                      <td className="p-4">
                        {assignment.intakeForm?.concern}
                      </td>

                      <td className="p-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          {assignment.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                            onClick={() =>
                              navigate(
                                `/therapist/clients/${assignment._id}`
                              )
                            }
                          >
                            View
                          </button>

                          <button
                            className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                            onClick={() =>
                              handleMessage(
                                assignment.client._id
                              )
                            }
                          >
                            Message
                          </button>

                          <button
                            className="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
                            onClick={() =>
                              handleSchedule(assignment)
                            }
                          >
                            Schedule
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-6 flex items-center gap-4">
        <Users size={40} />
        <div>
          <h2 className="text-xl font-semibold">
            Total Assigned Clients
          </h2>
          <p className="text-3xl font-bold">
            {assignedClients.length}
          </p>
        </div>
      </div>
      <ScheduleSessionModal
        open={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        client={selectedClient}
        onSuccess={() => {
          fetchAssignedClients();
        }}
      />
    </div>
  );
}

export default Clients;