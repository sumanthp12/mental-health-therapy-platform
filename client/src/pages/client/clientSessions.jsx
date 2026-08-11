import { useEffect, useState } from "react";

import PageHeader from "../../components/ui/PageHeader";
import SessionCard from "../../components/ui/SessionCard";

import { getSessions } from "../../services/sessionService";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import { showError } from "../../utils/toast";

function Sessions() {
  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await getSessions();

      if (Array.isArray(data)) {
        setSessions(data);
      } else if (Array.isArray(data?.sessions)) {
        setSessions(data.sessions);
      } else {
        setSessions([]);
      }
    } catch (err) {
      console.error(
        "Failed to load sessions:",
        err
      );

      setError(true);

      showError(
        err?.response?.data?.message ||
          "Unable to load your sessions."
      );
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSessions();
  }, []);


if (loading) {
  return (
    <LoadingSpinner
      fullScreen
      label="Loading your sessions..."
    />
  );
}

if (error) {
  return (
    <ErrorState
      title="Unable to load your sessions"
      description="We couldn't load your therapy sessions right now. Please try again."
      onRetry={fetchSessions}
      retryText="Reload Sessions"
    />
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
        <EmptyState
          title="No sessions found"
          description="Your therapist will schedule your first therapy session once you have been assigned."
        />
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

          return (
            <SessionCard
              key={session._id || index}
              therapist={session.therapist}
              sessionDate={session.sessionDate}
              sessionTime={session.sessionTime}
              status={session.status}
              meetingRoom={session.meetingRoom}
              sessionId={session._id}
            />
          );
        })}
        </div>
      )}

    </div>
  );
}

export default Sessions;