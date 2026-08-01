import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { findOrCreateConversation } from "../../services/chatService";
import ScheduleSessionModal from "../../components/sessions/ScheduleSessionModal";

function Clients() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [assignedClients, setAssignedClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);  

  const fetchAssignedClients = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/assignments/therapist/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAssignedClients(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMessage = async (clientId) => {
    try {
      const conversation = await findOrCreateConversation(clientId);

      navigate(
        `/therapist/messages?id=${conversation._id}`
      );
    } catch (error) {
      console.error("Failed to start conversation:", error);
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

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Client</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Concern</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>

            {filteredClients.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  No clients assigned.
                </td>
              </tr>
            ) : (
              filteredClients.map((assignment) => (
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
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {assignment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        onClick={() =>
                          navigate(`/therapist/clients/${assignment._id}`)
                        }
                      >
                        View
                      </button>
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        onClick={() =>
                          handleMessage(assignment.client._id)
                        }
                      >
                        Message
                      </button>
                      <button
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                        onClick={() => handleSchedule(assignment)}
                      >
                        Schedule
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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