import { useEffect, useState } from "react";

import PageHeader from "../../components/ui/PageHeader";
import SessionCard from "../../components/ui/SessionCard";

import { getSessions } from "../../services/sessionService";

function Sessions() {
  const [sessions, setSessions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

useEffect(() => {
  const fetchSessions = async () => {
    try {
      const data =
        await getSessions();

      if (Array.isArray(data)) {
        setSessions(data);
      } else if (data.sessions) {
        setSessions(data.sessions);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchSessions();
}, []);


  

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading Sessions...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="My Sessions"
        subtitle="Manage your therapy sessions"
      />

      <div className="flex justify-between items-center">

        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <h3 className="font-semibold text-blue-700">
            Session Scheduling
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            Your therapist will schedule upcoming sessions. Once a session is created,
            it will appear here and you'll be able to join it at the scheduled time.
          </p>
        </div>

        </div>

      {sessions.length === 0 ? (
        <div
          className="
          bg-white
          rounded-3xl
          p-10
          text-center
          shadow-sm
          "
        >
          <h3 className="text-xl font-semibold">
            No Sessions Found
          </h3>

          <p className="text-slate-500 mt-2">
            Book your first therapy
            session to get started.
          </p>
        </div>
      ) : (
        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
          "
        >
          {sessions.map((session, index) => {

          // console.log("SESSION DATA:", session);

          return (
            <SessionCard
              key={session._id || index}
              therapist={session.therapist}
              sessionDate={session.sessionDate}
              sessionTime={session.sessionTime}
              status={session.status}
            />
          );
        })}
        </div>
      )}

    </div>
  );
}

export default Sessions;