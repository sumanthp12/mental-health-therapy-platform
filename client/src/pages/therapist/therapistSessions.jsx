import PageHeader from "../../components/ui/PageHeader";
import SessionCard from "../../components/ui/SessionCard";

function Sessions() {

  const sessions = [
    {
      therapist:
        "Client: John Doe",
      date:
        "15 June 2026",
      time:
        "5:00 PM",
      status:
        "Pending Approval",
    },
  ];

  return (
    <div className="space-y-6">

      <PageHeader
        title="Sessions"
        subtitle="Manage assigned sessions"
      />

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