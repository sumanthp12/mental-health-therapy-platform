import {
  Calendar,
  Clock,
  Video,
  Brain,
} from "lucide-react";

function SessionCard({
  therapist,
  sessionDate,
  sessionTime,
  status,
}) {

  const formattedDate =
    sessionDate
      ? new Date(
          sessionDate
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      : "Date Not Available";

  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-6
      shadow-sm
      border
      border-slate-100
      hover:shadow-lg
      transition-all
      duration-300
      "
    >
      <div
        className="
        flex
        items-center
        gap-3
        mb-4
        "
      >
        <div
          className="
          h-12
          w-12
          rounded-2xl
          bg-blue-100
          flex
          items-center
          justify-center
          "
        >
          <Brain
            size={22}
            className="text-blue-600"
          />
        </div>

        <div>
          <h3
            className="
            font-bold
            text-lg
            "
          >
            {
            therapist?.name ||
            therapist?.specialization ||
            "Therapist"
            }
          </h3>

          <p
            className="
            text-sm
            text-slate-500
            "
          >
            Therapy Session
          </p>
        </div>
      </div>

      <div
        className="
        space-y-3
        "
      >
        <div
          className="
          flex
          items-center
          gap-2
          "
        >
          <Calendar
            size={18}
          />

          <span>
            {formattedDate}
          </span>
        </div>

        <div
          className="
          flex
          items-center
          gap-2
          "
        >
          <Clock
            size={18}
          />

          <span>
            {
              sessionTime ||
              "Time Not Available"
            }
          </span>
        </div>
      </div>

      <div
        className="
        mt-6
        flex
        justify-between
        items-center
        "
      >
        <span
          className={`
          px-3
          py-1
          rounded-full
          text-sm
          font-medium

          ${
            status ===
            "approved"
              ? "bg-green-100 text-green-700"
              : ""
          }

          ${
            status ===
            "pending"
              ? "bg-yellow-100 text-yellow-700"
              : ""
          }

          ${
            status ===
            "completed"
              ? "bg-blue-100 text-blue-700"
              : ""
          }
          `}
        >
          {status}
        </span>

        <button
          className="
          flex
          items-center
          gap-2
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          text-white
          px-4
          py-2
          rounded-xl
          "
        >
          <Video size={18} />
          Join
        </button>
      </div>
    </div>
  );
}

export default SessionCard;