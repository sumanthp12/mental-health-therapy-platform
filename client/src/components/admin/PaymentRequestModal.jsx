import { useState } from "react";
import { X } from "lucide-react";
import { requestPayment } from "../../services/paymentService";

function PaymentRequestModal({
  isOpen,
  onClose,
  session,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState("");

  const [description, setDescription] =
    useState("Therapy Session");

  const [dueDate, setDueDate] =
    useState("");

  if (!isOpen || !session) return null;

  const handleSubmit = async () => {
    try {

      if (!amount || Number(amount) <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      if (!dueDate) {
        alert("Please select a due date.");
        return;
      }
      setLoading(true);

      await requestPayment({
        clientId: session.client._id,
        sessionId: session._id,
        amount: Number(amount),
        description,
        dueDate,
      });

      onSuccess();

      setAmount("");
      setDescription("Therapy Session");
      setDueDate("");

      onClose();

      alert("Payment request sent successfully.");

    } catch (error) {

      console.error(error);

      alert("Failed to send payment request.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-semibold">
            Request Session Payment
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="space-y-4">

          <div>

            <label className="text-sm font-medium">
              Client
            </label>

            <input
              disabled
              value={session.client?.name}
              className="mt-1 w-full rounded-xl border bg-gray-100 p-3"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Therapist
            </label>

            <input
              disabled
              value={session.therapist?.fullName}
              className="mt-1 w-full rounded-xl border bg-gray-100 p-3"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Session
            </label>

            <input
              disabled
              value={`${new Date(
                session.sessionDate
              ).toLocaleDateString()} • ${
                session.sessionTime
              }`}
              className="mt-1 w-full rounded-xl border bg-gray-100 p-3"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Amount
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              className="mt-1 w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Description
            </label>

            <textarea
              rows={3}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="mt-1 w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(
                  e.target.value
                )
              }
              className="mt-1 w-full rounded-xl border p-3"
            />

          </div>

        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
        >
          {loading
            ? "Sending..."
            : "Send Payment Request"}
        </button>

      </div>

    </div>
  );
}

export default PaymentRequestModal;