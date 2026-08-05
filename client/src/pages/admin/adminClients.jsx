import { useEffect, useMemo, useState } from "react";
import { Users, UserCheck, CreditCard, CircleDollarSign } from "lucide-react";

import TopBar from "../../components/dashboard/TopBar";
import StatsCard from "../../components/admin/StatsCard";
import SearchBar from "../../components/admin/SearchBar";
import ClientCard from "../../components/admin/ClientCard";
import PaymentRequestModal from "../../components/admin/PaymentRequestModal";

function Clients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedClient, setSelectedClient] = useState(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8000/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const users = await response.json();

      const clientUsers = users.filter(
        (user) => user.role === "client"
      );

      const formatted = clientUsers.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,

        status: "Active",

        therapist: "Not Assigned",

        paymentStatus: "Not Requested",

        sessionId: null,
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

  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      client.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [clients, search]);

  const handleRequestPayment = (client) => {
    setSelectedClient(client);
    setOpenPaymentModal(true);
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
          title="Pending Payments"
          value={
            clients.filter(
              (client) =>
                client.paymentStatus === "Requested"
            ).length
          }
          icon={<CreditCard size={28} />}
          color="bg-orange-500"
        />

        <StatsCard
          title="Paid Clients"
          value={
            clients.filter(
              (client) =>
                client.paymentStatus === "Paid"
            ).length
          }
          icon={<CircleDollarSign size={28} />}
          color="bg-purple-600"
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
              onView={() => {
                console.log(client);
              }}
              onRequestPayment={handleRequestPayment}
            />

          ))}

        </div>

      )}

      <PaymentRequestModal
        isOpen={openPaymentModal}
        client={selectedClient}
        onClose={() => setOpenPaymentModal(false)}
        onSuccess={fetchClients}
      />

    </div>
  );
}

export default Clients;