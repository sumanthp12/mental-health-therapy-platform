import {
  Calendar,
  Clock,
  Video,
} from "lucide-react";

function SessionCard({
  therapist,
  date,
  time,
  status,
}) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-6
      shadow-sm
      border
      border-slate-100
      "
    >

      <h3 className="font-bold text-lg">
        {therapist}
      </h3>

      <div className="mt-4 space-y-2">

        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <span>{date}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={18} />
          <span>{time}</span>
        </div>

      </div>

      <div className="mt-5 flex justify-between items-center">

        <span
          className="
          px-3
          py-1
          rounded-full
          text-sm
          bg-blue-100
          text-blue-700
          "
        >
          {status}
        </span>

        <button
          className="
          flex
          items-center
          gap-2
          bg-blue-600
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