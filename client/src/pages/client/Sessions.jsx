import PageHeader from "../../components/ui/PageHeader";
import SessionCard from "../../components/ui/SessionCard";

function Sessions() {

  const sessions = [
    {
      therapist:
        "Dr. Sarah Wilson",
      date:
        "15 June 2026",
      time:
        "5:00 PM",
      status:
        "Upcoming",
    },
    {
      therapist:
        "Dr. Sarah Wilson",
      date:
        "8 June 2026",
      time:
        "4:00 PM",
      status:
        "Completed",
    },
  ];

  return (
    <div className="space-y-6">

      <PageHeader
        title="My Sessions"
        subtitle="Manage your therapy sessions"
      />

      <button
        className="
        bg-blue-600
        text-white
        px-5
        py-3
        rounded-2xl
        "
      >
        Book Session
      </button>

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        "
      >
        {sessions.map(
          (
            session,
            index
          ) => (
            <SessionCard
              key={index}
              {...session}
            />
          )
        )}
      </div>

    </div>
  );
}

export default Sessions;