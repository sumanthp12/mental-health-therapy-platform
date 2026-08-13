import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Search,
  UserRound,
} from "lucide-react";

import TopBar from "../../components/dashboard/TopBar";
import PaymentRequestModal from "../../components/admin/PaymentRequestModal";

function AdminSessions() {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [selectedSession, setSelectedSession] =
    useState(null);

  const [openPaymentModal, setOpenPaymentModal] =
    useState(false);

  const fetchSessions = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/sessions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      setSessions(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSessions();
  }, []);

  const filteredSessions =
    useMemo(() => {

      return sessions.filter((session) => {

        return (
          session.client?.name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

          session.therapist?.fullName
            ?.toLowerCase()
            .includes(search.toLowerCase())
        );

      });

    }, [sessions, search]);

  const totalSessions =
    sessions.length;

  const completedSessions =
    sessions.filter(
      (s) => s.status === "completed"
    ).length;

  const pendingPayments =
    sessions.filter(
      (s) =>
        s.paymentStatus !== "paid"
    ).length;

  const paidSessions =
    sessions.filter(
      (s) =>
        s.paymentStatus === "paid"
    ).length;

  const handlePayment = (
    session
  ) => {

    setSelectedSession(session);

    setOpenPaymentModal(true);

  };

  return (
    <div className="space-y-6">

      <TopBar title="Sessions" />

      <div className="grid gap-5 md:grid-cols-4">

        <div className="rounded-2xl bg-white p-5 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Sessions
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalSessions}
              </h2>

            </div>

            <CalendarDays
              size={34}
              className="text-blue-600"
            />

          </div>

        </div>

        <div className="rounded-2xl bg-white p-5 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Completed
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {completedSessions}
              </h2>

            </div>

            <CheckCircle2
              size={34}
              className="text-green-600"
            />

          </div>

        </div>

        <div className="rounded-2xl bg-white p-5 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Pending Payments
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {pendingPayments}
              </h2>

            </div>

            <Clock3
              size={34}
              className="text-orange-500"
            />

          </div>

        </div>

        <div className="rounded-2xl bg-white p-5 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Paid
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {paidSessions}
              </h2>

            </div>

            <CreditCard
              size={34}
              className="text-purple-600"
            />

          </div>

        </div>

      </div>

      <div className="relative">

        <Search
          className="absolute left-4 top-3.5 text-gray-400"
          size={18}
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search by client or therapist..."
          className="w-full rounded-xl border bg-white py-3 pl-11 pr-4 outline-none"
        />

      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="border-b bg-gray-50">

            <tr>

              <th className="p-4 text-left">
                Client
              </th>

              <th className="p-4 text-left">
                Therapist
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Time
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Payment
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

                        {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-gray-500"
                >
                  Loading sessions...
                </td>
              </tr>
            ) : filteredSessions.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-gray-500"
                >
                  No sessions found.
                </td>
              </tr>
            ) : (
              filteredSessions.map((session) => (
                <tr
                  key={session._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Client */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <UserRound
                          size={18}
                          className="text-blue-600"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          {session.client?.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {session.client?.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Therapist */}
                  <td className="p-4">
                    <div>
                      <h3 className="font-medium">
                        {session.therapist?.fullName}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {
                          session.therapist
                            ?.specialization
                        }
                      </p>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="p-4">
                    {new Date(
                      session.sessionDate
                    ).toLocaleDateString()}
                  </td>

                  {/* Time */}
                  <td className="p-4">
                    {session.sessionTime}
                  </td>

                  {/* Session Status */}
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        session.status ===
                        "completed"
                          ? "bg-green-100 text-green-700"
                          : session.status ===
                            "scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {session.status}
                    </span>
                  </td>

                  {/* Payment Status */}
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        session.paymentStatus ===
                        "paid"
                          ? "bg-green-100 text-green-700"
                          : session.paymentStatus ===
                            "requested"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {session.paymentStatus ||
                        "Not Requested"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <button
                      disabled={
                        session.paymentStatus ===
                        "paid"
                      }
                      onClick={() =>
                        handlePayment(session)
                      }
                      className={`rounded-xl px-4 py-2 text-sm font-medium text-white transition ${
                        session.paymentStatus ===
                        "paid"
                          ? "cursor-not-allowed bg-gray-400"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {session.paymentStatus ===
                      "paid"
                        ? "Paid"
                        : "Request Payment"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaymentRequestModal
        isOpen={openPaymentModal}
        session={selectedSession}
        onClose={() => {
          setOpenPaymentModal(false);
          setSelectedSession(null);
        }}
        onSuccess={() => {
          fetchSessions();
        }}
      />
    </div>
  );
}

export default AdminSessions;