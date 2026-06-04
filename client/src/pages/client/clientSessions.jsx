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

        <button
            className="
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            text-white
            px-6
            py-3
            rounded-2xl
            shadow-lg
            "
        >
            + Book Session
        </button>

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