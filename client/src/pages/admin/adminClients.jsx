import { useEffect, useMemo, useState } from "react";
import { Users, UserCheck } from "lucide-react";

import TopBar from "../../components/dashboard/TopBar";
import StatsCard from "../../components/admin/StatsCard";
import SearchBar from "../../components/admin/SearchBar";
import ClientCard from "../../components/admin/ClientCard";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../../services/userService";

function Clients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const handleViewClient = (client) => {
    setSelectedClient(client);
    setShowViewModal(true);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

const fetchClients = async () => {
  try {
    const response = await getUsers();

    const clientUsers = response.users.filter(
      (user) => user.role === "client"
    );

    const formatted = clientUsers.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,

      status: user.status,

      therapist:
        user.assignment?.therapist?.user?.name ||
        user.therapist?.name ||
        "Not Assigned",

      intake: user.intake,

      assignment: user.assignment,
    }));

    setClients(formatted);

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchClients();
  }, []);

const handleEditClick = (client) => {

  setEditingClient(client);

  setFormData({
    name: client.name,
    email: client.email,
  });

  setShowModal(true);

};

const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      client.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [clients, search]);

  const handleUpdateClient = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateUser(editingClient.id, formData);

      fetchClients();

      setShowModal(false);
      setEditingClient(null);

      setFormData({
        name: "",
        email: "",
      });

    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Unable to update client"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClient = async (client) => {
    const confirmed = window.confirm(
      `Delete ${client.name}?`
    );

    if (!confirmed) return;

    try {
      await deleteUser(client.id);

      fetchClients();

    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Unable to delete client"
      );
    }
  };


  return (
    <div className="space-y-6">

      <TopBar title="Clients" />

      {/* Stats */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Total Clients"
          value={clients.length}
          icon={<Users size={28} />}
          color="bg-blue-600"
        />

        <StatsCard
          title="Active Clients"
          value={clients.length}
          icon={<UserCheck size={28} />}
          color="bg-green-600"
        />

        <StatsCard
          title="Assigned Therapist"
          value={
            clients.filter(
              (client) => client.therapist !== "Not Assigned"
            ).length
          }
          icon={<UserCheck size={28} />}
          color="bg-indigo-600"
        />

        <StatsCard
          title="Intake Completed"
          value={clients.length} // temporary
          icon={<Users size={28} />}
          color="bg-cyan-600"
        />

      </div>

      {/* Search */}

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search clients..."
      />

      {/* Cards */}

      {filteredClients.length === 0 ? (

        <div className="rounded-2xl border bg-white py-20 text-center shadow-sm">

          <h2 className="text-xl font-semibold text-gray-700">
            No Clients Found
          </h2>

          <p className="mt-2 text-gray-500">
            Try another search keyword.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredClients.map((client) => (

            <ClientCard
              key={client.id}
              client={client}
              onView={handleViewClient}
              onEdit={handleEditClick}
              onDelete={handleDeleteClient}
            />

          ))}

        </div>

      )}

{
  showModal && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">
          Edit Client
        </h2>
        <form
          onSubmit={handleUpdateClient}
          className="space-y-4"
        >
          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
          <input
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-5 py-2 rounded-xl border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white"
            >
              {saving ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

{
  showViewModal && selectedClient && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-3xl bg-white">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">
          <div>
            <h2 className="text-3xl font-bold">
              Client Details
            </h2>
            <p className="mt-1 text-gray-500">
              Complete client information
            </p>
          </div>
          <button
            onClick={() => setShowViewModal(false)}
            className="text-3xl text-gray-400 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto space-y-8 p-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">
                Client Name
              </p>
              <p className="mt-1 font-semibold text-lg">
                {selectedClient.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>
              <p className="mt-1 font-semibold">
                {selectedClient.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>
              <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {selectedClient.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Assigned Therapist
              </p>
              <p className="mt-1 font-semibold">
                {selectedClient.assignment?.therapist?.user?.name ||
                  selectedClient.therapist ||
                  "Not Assigned"}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border bg-gray-50 p-6">

            <h3 className="text-xl font-semibold mb-6">
              Intake Assessment
            </h3>

            <div className="grid grid-cols-2 gap-6">

              <div>
                <p className="text-sm text-gray-500">
                  Age
                </p>

                <p className="font-semibold">
                  {selectedClient.intake?.age || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Gender
                </p>

                <p className="font-semibold">
                  {selectedClient.intake?.gender || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Preferred Language
                </p>

                <p className="font-semibold">
                  {selectedClient.intake?.preferredLanguage || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Preferred Therapist Gender
                </p>

                <p className="font-semibold">
                  {selectedClient.intake?.preferredTherapistGender || "-"}
                </p>
              </div>

            </div>

            <div className="mt-8">

              <p className="text-sm text-gray-500">
                Primary Concern
              </p>

              <p className="mt-2">
                {selectedClient.intake?.concern || "-"}
              </p>

            </div>

            <div className="mt-6">

              <p className="text-sm text-gray-500">
                Symptoms
              </p>

              <p className="mt-2">
                {selectedClient.intake?.symptoms || "-"}
              </p>

            </div>

            <div className="mt-6">

              <p className="text-sm text-gray-500">
                Emergency Contact
              </p>

              <p className="mt-2">
                {selectedClient.intake?.emergencyContact || "-"}
              </p>

            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Notes
              </p>

              <p className="mt-2">
                {selectedClient.intake?.notes || "-"}
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end border-t px-8 py-5">
          <button
            onClick={() => setShowViewModal(false)}
            className="rounded-xl border px-6 py-3 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

    </div>
  );
}

export default Clients;