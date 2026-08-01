import {
  Calendar,
  Clock,
  Video,
  Brain,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function SessionCard({
  therapist,
  sessionDate,
  sessionTime,
  status,
  meetingRoom,
  sessionId,
  onApprove,
  onStartMeeting,
  onCompleteMeeting,
  isTherapist = false,
}) {
  const navigate = useNavigate();

  const joinMeeting = () => {
    navigate(`/meeting/${meetingRoom}`, {
      state: {
        sessionId,
      },
    });
  };

  const formatDate = (date) => {
    if (!date) return "Date Not Available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const statusClasses = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  live: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <Brain className="text-blue-600" size={26} />
        </div>

        <div>
          <h3 className="text-lg font-bold">
            {typeof therapist === "string"
              ? therapist
              : therapist?.user?.name || "Therapist"}
          </h3>

          <p className="text-sm text-slate-500">
            {typeof therapist === "object"
              ? therapist?.specialization
              : "Therapy Session"}
          </p>
        </div>
      </div>

      {/* Date */}

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="text-slate-500" size={18} />

          <span className="font-medium">
            {formatDate(sessionDate)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="text-slate-500" size={18} />

          <span className="font-medium">
            {sessionTime || "Time Not Available"}
          </span>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${
            statusClasses[status] ||
            "bg-slate-100 text-slate-700"
          }`}
        >
          {status}
        </span>

        {status === "pending" && onApprove ? (
          <button
            onClick={() => onApprove(sessionId)}
            className="rounded-xl bg-yellow-500 px-5 py-2 text-white hover:bg-yellow-600"
          >
            Approve
          </button>
        ) : status === "approved" ? (
          isTherapist ? (
            <button
              onClick={() => onStartMeeting(sessionId)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-2 text-white hover:opacity-90"
            >
              <Video size={18} />
              Start Session
            </button>
          ) : (
            <button
              disabled
              className="cursor-not-allowed rounded-xl bg-slate-200 px-5 py-2 text-slate-600"
            >
              Waiting for Therapist
            </button>
          )
        ) : status === "live" ? (
          <div className="flex gap-2">
            <button
              onClick={joinMeeting}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-white hover:opacity-90"
            >
              <Video size={18} />
              Join Session
            </button>

            {isTherapist && (
              <button
                onClick={() => onCompleteMeeting(sessionId)}
                className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Complete
              </button>
            )}
          </div>
        ) : status === "completed" ? (
          <button
            disabled
            className="cursor-not-allowed rounded-xl bg-slate-200 px-5 py-2 text-slate-600"
          >
            Completed
          </button>
        ) : status === "cancelled" ? (
          <button
            disabled
            className="cursor-not-allowed rounded-xl bg-red-100 px-5 py-2 text-red-700"
          >
            Cancelled
          </button>
        ) : (
          <button
            disabled
            className="cursor-not-allowed rounded-xl bg-slate-200 px-5 py-2 text-slate-600"
          >
            Waiting
          </button>
        )}
      </div>
    </div>
  );
}

export default SessionCard;