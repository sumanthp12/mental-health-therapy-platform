import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SessionCard from "../../components/ui/SessionCard";
import { useAuth } from "../../context/AuthContext";

import {
  approveSession,
  startMeeting,
  completeMeeting,
} from "../../services/sessionService";

function Sessions() {
  const { token } = useAuth();

  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/sessions/therapist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSessions(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date Not Available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchSessions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleApprove = async (sessionId) => {
    try {
      await approveSession(sessionId);
      await fetchSessions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartMeeting = async (sessionId) => {
    try {
      await startMeeting(sessionId);
      await fetchSessions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteMeeting = async (sessionId) => {
    try {
      await completeMeeting(sessionId);
      await fetchSessions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sessions"
        subtitle="Manage assigned sessions"
      />

      {sessions.length === 0 ? (
        /* Empty State */
        <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex max-w-md flex-col items-center px-6 py-12 text-center">
            {/* Icon */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100">
              <CalendarDays
                size={38}
                className="text-blue-600"
              />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-slate-900">
              No sessions yet
            </h2>

            {/* Description */}
            <p className="mt-3 text-base leading-7 text-slate-500">
              You don't have any therapy sessions assigned
              to you yet.
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Sessions will appear here once they are scheduled.
            </p>
          </div>
        </div>
      ) : (
        /* Sessions */
        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-2
          "
        >
          {sessions.map((session) => (
            <SessionCard
              key={session._id}
              therapist={`Client: ${session.client?.name}`}
              sessionDate={formatDate(session.sessionDate)}
              sessionTime={session.sessionTime}
              status={session.status}
              meetingRoom={session.meetingRoom}
              sessionId={session._id}
              onApprove={handleApprove}
              onStartMeeting={handleStartMeeting}
              onCompleteMeeting={handleCompleteMeeting}
              isTherapist={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Sessions;