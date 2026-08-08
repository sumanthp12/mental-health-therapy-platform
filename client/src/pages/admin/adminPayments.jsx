import { useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  CircleDollarSign,
  Clock3,
  CheckCircle2,
  Plus,
} from "lucide-react";
import PaymentRequestModal from "../../components/admin/PaymentRequestModal";
import TopBar from "../../components/dashboard/TopBar";
import StatsCard from "../../components/admin/StatsCard";
import SearchBar from "../../components/admin/SearchBar";

function AdminPayments() {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [revenue, setRevenue] =
  useState(0);

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
  "http://localhost:8000/api/sessions/admin",
  {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setSessions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRevenue = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8000/api/payments/revenue-stats",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setRevenue(
          data.stats?.totalRevenue || 0
        );
      }
    } catch (error) {
      console.error(
        "Failed to fetch revenue:",
        error
      );
    }
  };

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchSessions();
  fetchRevenue();
}, []);

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) =>
      session.client?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [sessions, search]);

  return (
    <div className="space-y-6">

      <TopBar title="Payments" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Total Sessions"
          value={sessions.length}
          icon={<CreditCard size={28} />}
          color="bg-blue-600"
        />

        <StatsCard
          title="Payment Requested"
          value={
            sessions.filter(
              (s) => s.paymentStatus?.toLowerCase() === "requested"
            ).length
          }
          icon={<Clock3 size={28} />}
          color="bg-orange-500"
        />

        <StatsCard
          title="Paid"
          value={
            sessions.filter(
              (s) => s.paymentStatus?.toLowerCase() === "paid"
            ).length
          }
          icon={<CheckCircle2 size={28} />}
          color="bg-green-600"
        />

        <StatsCard
          title="Revenue"
          value={`₹${Number(
            revenue || 0
          ).toLocaleString("en-IN")}`}
          icon={
            <CircleDollarSign size={28} />
          }
          color="bg-purple-600"
        />

      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search client..."
      />

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="p-4 text-left">
                Client
              </th>

              <th className="p-4 text-left">
                Therapist
              </th>

              <th className="p-4 text-left">
                Session
              </th>

              <th className="p-4 text-left">
                Payment
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredSessions.map((session) => (

              <tr
                key={session._id}
                className="border-t"
              >

                <td className="p-4">
                  {session.client?.name}
                </td>

                <td className="p-4">
                  {session.therapist?.fullName}
                </td>

                <td className="p-4">
                  {new Date(session.sessionDate).toLocaleDateString()}
                </td>

                <td className="p-4">

                  <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    session.paymentStatus?.toLowerCase() === "paid"
                      ? "bg-green-100 text-green-700"
                      : session.paymentStatus?.toLowerCase() === "requested"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {session.paymentStatus || "Pending"}
                </span>

                </td>

                <td className="p-4">

                  {session.paymentStatus?.toLowerCase() === "paid" ? (
                      <span className="rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
                        Paid
                      </span>
                    ) : session.paymentStatus?.toLowerCase() === "requested" ? (
                      <span className="rounded-lg bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-700">
                        Requested
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedSession(session);
                          setShowPaymentModal(true);
                        }}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        <Plus size={16} />
                        Request Payment
                      </button>
                    )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
        <PaymentRequestModal
          isOpen={showPaymentModal}
          session={selectedSession}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedSession(null);
          }}
          onSuccess={async () => {
            await fetchSessions();
            await fetchRevenue();
          }}
        />

    </div>
  );
}

export default AdminPayments;