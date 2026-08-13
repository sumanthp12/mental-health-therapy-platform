import { useState } from "react";
import axios from "axios";
import {
  showSuccess,
  showError,
} from "../../utils/toast";

function ScheduleSessionModal({
  open,
  onClose,
  client,
  onSuccess,
}) {
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSchedule = async () => {
    if (!sessionDate || !sessionTime) {
      showError("Please select date and time.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/sessions/schedule`,
        {
          clientId: client._id,
          sessionDate,
          sessionTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSuccess("Session scheduled successfully!");

      setSessionDate("");
      setSessionTime("");

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      showError("Failed to schedule session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          Schedule Therapy Session
        </h2>

        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-2">
            Client
          </label>

          <input
            value={client?.name || ""}
            disabled
            className="w-full border rounded-xl p-3 bg-gray-100"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-2">
            Session Date
          </label>

          <input
            type="date"
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">
            Session Time
          </label>

          <input
            type="time"
            value={sessionTime}
            onChange={(e) => setSessionTime(e.target.value)}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSchedule}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Scheduling...
              </span>
            ) : (
              "Schedule Session"
            )}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ScheduleSessionModal;